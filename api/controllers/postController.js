const postService = require('../services/postService')

const getPosts = async (req, res, next)  => {
    try {
        const posts = await postService.getPosts(req.params.id);

        res.json(posts);
    } catch (err) {
        return next(err);
    }
};

const getUserPosts = async (req, res, next)  => {
    try {
        const posts = await postService.getUserPosts(req.params.id);

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
        const post = await postService.createPost(req.body);

        res.json({ message: 'Post created', post: post});
    } catch (err) {
        return next(err);
    }
};

const updatePost = async (req, res, next)  => {
    try {
        await postService.updatePost(req.params.id, req.body);

        res.json({ message: 'Post updated'});
    } catch (err) {
        return next(err);
    }
};
const deletePost = async (req, res, next)  => {
    try {
        await postService.deletePost(req.params.id);
        
        res.json({ message: 'Post deleted'});
    } catch (err) {
        return next(err);
    }
};

module.exports = {
    getPosts,
    getUserPosts,
    getPost,
    createPost,
    updatePost,
    deletePost
};