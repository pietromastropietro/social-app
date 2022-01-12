const commentService = require('../services/commentService')

const getComments = async (req, res, next)  => {
    try {
        const comments = await commentService.getComments();

        res.json(comments);
    } catch (err) {
        return next(err);
    }
};

const getComment = async (req, res, next)  => {
    try {
        const comment = await commentService.getComment(req.params.id);

        res.json(comment);
    } catch (err) {
        return next(err);
    }
};

const createComment = async (req, res, next)  => {
    try {
        await commentService.createComment(req.body);

        res.json({ message: 'Comment created'});
    } catch (err) {
        return next(err);
    }
};

const updateComment = async (req, res, next)  => {
    try {
        await commentService.updateComment(req.params.id, req.body);

        res.json({ message: 'Comment updated'});
    } catch (err) {
        return next(err);
    }
};
const deleteComment = async (req, res, next)  => {
    try {
        await commentService.deleteComment(req.params.id);

        res.json({ message: 'Comment deleted'});
    } catch (err) {
        return next(err);
    }
};

module.exports = {
    getComments,
    getComment,
    createComment,
    updateComment,
    deleteComment
};