const jwt = require('jsonwebtoken');
const db = require('../db/db');

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // validate user input

        let query = 'SELECT * FROM users WHERE email = $1';

        const user = (await db.query(query, [email]))[0];

        if (user && password === user.password_hash) {
            jwt.sign({ user: user }, process.env.JWT_KEY, { expiresIn: '1h' }, (err, token) => {
                if (err) {
                    console.log(err.message);
                    return res.json({ message: "JWT error" });
                }

                // remove password before sending user data to frontend
                delete user.password_hash;
                res.json({ message: 'Successful login', token, user: user });
            });
        } else {
            res.json({ message: "Incorrect/missing username or password" });
        }
    } catch (err) {
        console.log(err.message);
        return next(err);
    }
};

const register = async (req, res, next) => {
    try {
        // todo: fix fields when creating final database
        const user = {
            first_name: req.body.full_name,
            last_name: req.body.full_name,
            username: req.body.full_name,
            bio: null,
            dob: req.body.dob,
            email: req.body.email,
            password_hash: req.body.password,
            id: null,
        }
        
        // check if user exists by email
        let query = 'SELECT * FROM users WHERE email = $1';
        const fetchedUser = await db.query(query, [user.email]);
        
        if (fetchedUser.length) {
            return res.json({ message: "User already exists. Please login" });
        }
        
        // create new user
        query =
        `INSERT INTO users (first_name, last_name, username, bio, dob, email, password_hash, id) 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`;
        
        // temp
        const date = new Date();
        const tempId = `${date.getHours()}${date.getMinutes()}${date.getSeconds()}`;
        user.id = tempId;
        
        // TODO encrypt user password
        
        const params = Object.values(user);
        
        await db.query(query, params);

        res.json({ message: 'New user created' });
    } catch (err) {
        return next(err);
    }
};

const resetUserPassword = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // check if user exists by email
        let query = 'SELECT * FROM users WHERE email = $1';
        const user = await db.query(query, [email]);

        if (!user.length) {
            return res.json({ message: "User not found" });
        }

        // user exists, update password
        query = `UPDATE users SET password_hash = $1 WHERE email = $2`;

        // todo: encrypt password
        
        await db.query(query, [password, email]);

        res.json({ message: 'Password changed' });
    } catch (err) {
        return next(err);
    }

}

module.exports = {
    login,
    register,
    resetUserPassword
};