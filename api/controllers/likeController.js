const likeService = require('../services/likeService')

const getContentLikes = async (req, res, next)  => {
    try {
        const likes = await likeService.getContentLikes(req.params.id);

        res.json(likes);
    } catch (err) {
        return next(err);
    }
};

const createLike = async (req, res, next)  => {
    try {
        await likeService.createLike(req.body);
        
        res.json({ message: 'Like created'});
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
    getContentLikes,
    createLike,
    deleteLike
};