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
        const user = req.body;

        // verify if user exists by email
        let query = 'SELECT * FROM users WHERE email = $1';
        const oldUser = await db.query(query, [user.email]);

        if (oldUser.length) {
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

        const params = Object.values(user);

        // TODO encrypt user password

        await db.query(query, params);

        res.json({ message: 'New user created' });
    } catch (err) {
        console.log(err.message);
        return next(err);
    }
};

module.exports = {
    login,
    register
};

// exports.login = async (req, res, next) => {
//     try {
//         const user = await User.findOne({ email: req.body.username });

//         if (!user) {
//             console.log('User not found');

//             res.json({ message: 'User not found' });
//         } else if (user.password != req.body.password) {
//             console.log('incorrect password');

//             res.json({ message: 'Incorrect password' });
//         } else {
//             console.log('user found');

//             jwt.sign({ user }, process.env.JWT_KEY, { expiresIn: '7d' }, (err, token) => {
//                 res.json({ message: 'Successful login', token });
//             });
//         }
//     } catch (err) {
//         return next(err);
//     }
// };