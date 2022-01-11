const postService = require('../services/postService')

const getPosts = async (req, res, next)  => {
    try {
        const posts = await postService.getPosts();

        res.json(posts);
    } catch (err) {
        return next(err);
    }
};

const getPost = async (req, res, next)  => {
    try {
        const post = await postService.getPost(req.params.id);

        res.json(post);
    } catch (err) {
        return next(err);
    }
};

const createPost = async (req, res, next)  => {
    try {
        await postService.createPost(req.body);

        res.json({ message: 'Post created'});
    } catch (err) {
        return next(err);
    }
};

const updatePost = async (req, res, next)  => {
    try {
        await postService.updatePost(req.body);

        res.json({ message: 'Post updated'});
    } catch (err) {
        return next(err);
    }
};
const deletePost = async (req, res, next)  => {
    try {
        await postService.deletePost();

        res.json({ message: 'Post deleted'});
    } catch (err) {
        return next(err);
    }
};

module.exports = {
    getPosts,
    getPost,
    createPost,
    updatePost,
    deletePost
};