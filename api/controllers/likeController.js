const likeService = require('../services/likeService')

const getPostLikes = async (req, res, next)  => {
    try {
        const likes = await likeService.getPostLikes(req.params.id);

        res.json(likes);
    } catch (err) {
        return next(err);
    }
};

const getCommentLikes = async (req, res, next)  => {
    try {
        const likes = await likeService.getCommentLikes(req.params.id);

        res.json(likes);
    } catch (err) {
        return next(err);
    }
};

const createLike = async (req, res, next)  => {
    try {
        const like = await likeService.createLike(req.body);

        res.json({ message: 'Like created', like: like });
    } catch (err) {
        return next(err);
    }
};

const deleteLike = async (req, res, next)  => {
    try {
        await likeService.deleteLike(req.params.id);

        res.json({ message: 'Like deleted'});
    } catch (err) {
        return next(err);
    }
};

module.exports = {
    getPostLikes,
    getCommentLikes,
    createLike,
    deleteLike
};