const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('Express Test');
});

router.get('/users');

router.get('user/friends');

module.exports = router;