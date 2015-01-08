var models = require('../models');
var express = require('express');
var router = express.Router();

/* GET users listing. */
// router.get('/', function(req, res) {
//   res.send('respond with a resource');
// });

/* Create new user after signing up and redirect to chat room */
router.post('/signup', function(req, res) {
  var username = req.param('username')
  var password = req.param('password1')

  models.User.create({
    username: username,
    password: password
  }).then(function(user) {
    models.User.find({
      where: { username: username }
    }).then(function() {
      console.log(user.id)
    })
  })
})

module.exports = router;
