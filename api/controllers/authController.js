const jwt = require('jsonwebtoken');
const db = require('../utils/db');
const bcrypt = require('bcrypt');

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        
        // fetch user by email from db
        const query = 'SELECT * FROM users WHERE email = $1';
        const user = (await db.query(query, [email]))[0];

        if (!user) {
            return res.json({ message: "User not found" });
        }
        
        // user exists, decrypt and compare password
        const passwordMatch = await bcrypt.compare(password, user.password_hash);
        
        if (!passwordMatch) {
            return res.json({ message: "Incorrect password" });
        }

        // passwords match, get token
        const token =  jwt.sign({ user: user }, process.env.JWT_KEY, { expiresIn: '1h' });

        if (!token) {
            return res.json({ message: "JWT error" });
        }

        // return token and fetched user
        res.json({ message: 'Successful login', token, user: user });
    } catch (err) {
        return next(err);
    }
};

const register = async (req, res, next) => {
    try {
        const user = {
            full_name: req.body.full_name,
            bio: null,
            dob: req.body.dob,
            email: req.body.email,
            password_hash: undefined,
            profile_img_url: req.body.profile_img_url,
            registered_at: new Date()
        }

        // check if user exists by email
        let query = 'SELECT * FROM users WHERE email = $1';
        const fetchedUser = await db.query(query, [user.email]);

        if (fetchedUser.length) {
            return res.json({ message: "User already exists. Please login" });
        }

        // encrypt user password
        user.password_hash = await bcrypt.hash(req.body.password, 10);

        // create new user
        query =
            `INSERT INTO users (full_name, bio, dob, email, password_hash, profile_img_url, registered_at) 
        VALUES ($1, $2, $3, $4, $5, $6, $7)`;

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

        // fetch user by email from db
        let query = 'SELECT * FROM users WHERE email = $1';
        const user = (await db.query(query, [email]))[0];

        if (!user) {
            return res.json({ message: "User not found" });
        }

        // user exists, encrypt new password and update the db
        const encryptedPassword = await bcrypt.hash(password, 10);

        query = `UPDATE users SET password_hash = $1 WHERE email = $2`;

        await db.query(query, [encryptedPassword, email]);

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