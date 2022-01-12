const express = require('express');
const router = express.Router();

// Controllers import
const userController = require('../controllers/userController')
const postController = require('../controllers/postController')
const commentController = require('../controllers/commentController')

/* USER ROUTES */

// get all users
router.get('/users', userController.getUsers);

// get single user by id
router.get('/users/:id', userController.getUser);

// update user
router.put('/users/:id', userController.updateUser);

// delete user
router.delete('/users/:id', userController.deleteUser);


/* POST ROUTES */

// get all posts
router.get('/posts', postController.getPosts);

// get single post by id
router.get('/posts/:id', postController.getPost);

// create new post
router.post('/posts', postController.createPost);

// update post
router.put('/posts/:id', postController.updatePost);

// delete post
router.delete('/posts/:id', postController.deletePost);


/* COMMENT ROUTES */

// get all comments
router.get('/comments', commentController.getComments);

// get single comment by id
router.get('/comments/:id', commentController.getComment);

// create new comment
router.post('/comments', commentController.createComment);

// update comment
router.put('/comments/:id', commentController.updateComment);

// delete comment
router.delete('/comments/:id', commentController.deleteComment);

module.exports = router;