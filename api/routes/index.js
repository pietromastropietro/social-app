const express = require('express');
const router = express.Router();

// Controllers import
const indexController = require('../controllers/index');
const userController = require('../controllers/userController')

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
router.put('/user/:id', userController.updateUser);

// delete user
router.delete('/user/:id', userController.deleteUser);


/* GET home page. */
// router.get('/', verifyToken, indexController.index);
// router.get('/users/:id', userController.index);
// router.post('/login', indexController.login);

module.exports = router;