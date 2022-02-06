const express = require('express');
const router = express.Router();

// Controllers import
const userController = require('../controllers/userController')
const postController = require('../controllers/postController')
const commentController = require('../controllers/commentController')
const likeController = require('../controllers/likeController')
const relationController = require('../controllers/relationController')
const imageController = require('../controllers/imageController')

/* USER ROUTES */

// get all users
router.get('/users', userController.getUsers);

// get all users matching provided name (ex: api/users/name?name=john)
router.get('/users/name', userController.getUsersByName);

// get single user by id
router.get('/users/:id', userController.getUser);

// get user's friends by user id
router.get('/users/:id/friends', userController.getUserFriends);

// get user's friends suggestions by user id
router.get('/users/:id/suggestions', userController.getSuggestedUsers);

// update user
router.put('/users/:id', userController.updateUser);

// delete user
router.delete('/users/:id', userController.deleteUser);


/* POST ROUTES */

// get all posts
router.get('/posts', postController.getPosts);

// get all user's posts 
router.get('/posts/user/:id', postController.getUserPosts);

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

// get a post comments
router.get('/comments/post/:id', commentController.getPostComments);

// get single comment by id
router.get('/comments/:id', commentController.getComment);

// create new comment
router.post('/comments', commentController.createComment);

// update comment
router.put('/comments/:id', commentController.updateComment);

// delete comment
router.delete('/comments/:id', commentController.deleteComment);

/* LIKES ROUTES */

// get post likes
router.get('/likes/post/:id', likeController.getPostLikes);

// get comment likes
router.get('/likes/comment/:id', likeController.getCommentLikes);

// create new like
router.post('/likes', likeController.createLike);

// delete like
router.delete('/likes/:id', likeController.deleteLike);

/* RELATIONS ROUTES */

// get single relation
router.get('/relations/users/:ids', relationController.getRelation);

// get all user's friends requests
router.get('/relations/users/:id/requests', relationController.getFriendsRequests);

// create new relation
router.post('/relations', relationController.createRelation);

// update relation
router.put('/relations/:id', relationController.updateRelation);

// delete relation
router.delete('/relations/:id', relationController.deleteRelation);

/* IMAGE ROUTE */

// get a pre-signed url to upload images to AWS S3 bucket, and the url to the uploaded image
router.get('/aws-url', imageController.getAwsUrl)

module.exports = router;