const express = require('express');
const router = express.Router();

// Controller import
const authController = require('../controllers/authController');
const imageController = require('../controllers/imageController');

// Login route
router.post('/login', authController.login);

// Registration route
router.post('/register', authController.register);

// Forgotten password route, to let users change their password when they can't remember it
router.put('/reset-password', authController.resetUserPassword);

// Route to get a pre-signed url to upload images to AWS S3 bucket, and the url to the uploaded image
router.get('/aws-url', imageController.getAwsUrl)

module.exports = router;