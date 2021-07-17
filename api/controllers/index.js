const Post = require('../models/Post');
const Comment = require('../models/Comment');
const User = require('../models/User');

exports.index = async (req, res, next) => {
    try {
        // TODO get logged user info
        const posts = await Post
            .find()
            .populate('author')
            .populate({ path: 'comments', populate: { path: 'author' } })
            .populate('likes');
            
        const users = await User.find();

        res.json({ posts, users });
    } catch (err) {
        return next(err);
    }
};