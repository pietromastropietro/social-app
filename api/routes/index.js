const express = require('express');
const router = express.Router();

const indexController = require('../controllers/index');
const userController = require('../controllers/userController')

/* GET home page. */
router.get('/', indexController.index);

router.get('/users/:id', userController.index);

module.exports = router;