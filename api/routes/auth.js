const express = require('express');
const router = express.Router();

// Controller import
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');

// Login route
router.post('/login', authController.login);

// Registration route
router.post('/register', authController.register);

// Get user by email (ex: api/users/email?email=john@gmail.com). Route needed here to check user existence before creating a new account
router.get('/users/user', userController.getUserByEmail);

module.exports = router;