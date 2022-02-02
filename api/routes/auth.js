const express = require('express');
const router = express.Router();

// Controller import
const authController = require('../controllers/authController');

// Login route
router.post('/login', authController.login);

// Registration route
router.post('/register', authController.register);

// Forgotten password route, to let users change their password when they can't remember it
router.put('/reset-password', authController.resetUserPassword);

module.exports = router;