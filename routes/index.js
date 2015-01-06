var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'GIFScript' })
})

/* GET chat room */
router.get('/chat', function(req, res) {
  res.render('chat', { title: 'GIFScript' })
})

module.exports = router;
