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
                    return res.json({ message: "JWT error"});
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

        let query = 'SELECT * FROM users WHERE email = $1';

        const oldUser = await db.query(query, [user.email]);

        if (oldUser.length) {
            return res.json({ message: "User already exists. Please login" });
        }

        query =
            'INSERT INTO users (first_name, last_name, dob, email, password_hash, username'

        const params = [
            user.first_name,
            user.last_name,
            user.dob,
            user.email,
            user.password_hash,
            user.username
        ];

        if (user.hasOwnProperty('bio')) {
            query += ',bio) VALUES ($1, $2, $3, $4, $5, $6, $7)';
            params.push(user.bio);
        } else {
            query += ') VALUES ($1, $2, $3, $4, $5, $6)';
        }

        // TODO encrypt user password

        await db.query(query, params);

        res.json({ message: 'New user created' });
    } catch (err) {
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