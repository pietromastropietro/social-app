const express = require('express');
const router = express.Router();

// Controllers import
const indexController = require('../controllers/index');
const userController = require('../controllers/userController')
const postController = require('../controllers/postController')

// Utils import
const verifyToken = require('../token');


/* USER ROUTES */

// get all users
router.get('/users', userController.getUsers);

// get single user by id
router.get('/users/:id', userController.getUser);

// create new user
router.post('/users', userController.createUser);

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


/* GET home page. */
// router.get('/', verifyToken, indexController.index);
// router.get('/users/:id', userController.index);
// router.post('/login', indexController.login);

module.exports = router;