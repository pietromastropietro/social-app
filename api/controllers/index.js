const Post = require('../models/Post');
const Comment = require('../models/Comment');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

exports.index = async (req, res, next) => {
    jwt.verify(req.token, 'secretkey', async (err) => {
        if (err) {
            res.sendStatus(403);
        } else {
            try {
                // TODO get logged user info
                const posts = await Post
                    .find()
                    .populate('author')
                    .populate({ path: 'comments', populate: { path: 'author' } })
                    .populate('likes');

                const users = await User
                    .find()
                    .populate('friendsReqReceived');

                res.json({ posts, users });
            } catch (err) {
                return next(err);
            }
        }
    })
};

exports.login = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.username });

        if (!user) {
            console.log('User not found');
            
            res.json({ message: 'User not found' });
        } else if (user.password != req.body.password) {
            console.log('incorrect password');

            res.json({ message: 'Incorrect password' });
        } else {
            console.log('user found');

            jwt.sign({ user }, 'secretkey', { expiresIn: '7d'}, (err, token) => {
                res.json({ message: 'Successful login', token });
            });
        }
    } catch (err) {
        return next(err);
    }
};