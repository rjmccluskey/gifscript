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
    })
  }
  else {
    res.send('No user signed in!')
  }
})

/* Create new user after signing up and redirect to chat room */
router.post('/signup', function(req, res) {
  var username = req.param('username')
  var password1 = req.param('password1')
  var password2 = req.param('password2')

  if ( password1 === password2 ) {
    models.User.create({
      username: username,
      password: password1
    })
    .then(function(user) {
      // if success
      models.User.find({
        where: { username: username }
      }, function(error) {
        // if fail
        console.log(error)
        res.redirect('/')
      })
      .then(function() {
        req.session.user_id = user.id
      }).done(function() {
        res.redirect('/users')
      })
    })
  }
  else {
    res.redirect('/')
  }

})

module.exports = router;
