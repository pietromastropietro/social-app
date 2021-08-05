const express = require('express');
const router = express.Router();

const indexController = require('../controllers/index');
const userController = require('../controllers/userController')

const verifyToken = require('../token');

/* GET home page. */
router.get('/', verifyToken, indexController.index);

router.get('/users/:id', userController.index);

router.post('/login', indexController.login);

module.exports = router;