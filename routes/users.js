var models = require('../models');
var express = require('express');
var router = express.Router();

/* GET users listing. */
// router.get('/', function(req, res) {
//   res.send('respond with a resource');
// });

router.get('/', function(req,res) {
  var user
  if (req.session.user_id) {
    user = models.User.find({
      where: { id: req.session.user_id }
    }).then(function(user) {
      res.send('Hello ' + user.username + '!')
      user.destroy()
    })
  }
  else {
    res.send('No user signed in!')
  }
})

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
      req.session.user_id = user.id
    }).then(function() {
      res.redirect('/users')
    })
  })
})

module.exports = router;
