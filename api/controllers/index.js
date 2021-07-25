const Post = require('../models/Post');
const Comment = require('../models/Comment');
const User = require('../models/User');

const passport = require("passport");
require('../passport')(passport);

exports.index = async (req, res, next) => {
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
};

exports.login = (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.send('user not found');
        }
        req.logIn(user, (err) => {
            if (err) {
                return next(err);
            }
            return res.send('successful auth');
        });
    })(req, res, next);
};