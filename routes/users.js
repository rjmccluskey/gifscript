var models = require('../models');
var express = require('express');
var router = express.Router();


// FOR TESTING PURPOSES
// router.get('/', function(req,res) {
//   if (req.session.username) {
//     res.send('Hello ' + req.session.username + '!')
//   }
//   else {
//     res.send('No user signed in!')
//   }
// })

/* Login an existing user */
router.get('/login', function(req,res) {
  var username = req.param('username')
  var password = req.param('password')
  var existingUser
  var errors = []

  models.User.find({
    where: {username: username}
  }).then(function(user){
    existingUser = user
  }).then(function(){
    if (!existingUser) {
      errors.push('Username does not exist')
    }
  }).then(function(){
    if (username === "") {
      errors.push('Please enter a username')
    }
  }).then(function(){
    if (password === "") {
      errors.push('Please enter a password')
    }
  }).then(function(){
    if (existingUser && existingUser.password != password) {
      errors.push('Incorrect password')
    }
  }).then(function(){
    if (errors.length === 0) {
      req.session.username = username
      res.redirect('/chat')
    }
    else {
      res.render('index', {title: 'GIFScript', errors: errors})
    }
  })
})

/* Create new user after signing up and redirect to chat room */
router.post('/signup', function(req, res) {
  var username = req.param('username')
  var password1 = req.param('password1')
  var password2 = req.param('password2')
  var existingUser
  var errors = []

  models.User.find({
    where:{username: username}
  }).then(function(user){
    existingUser = user
  }).then(function(){
    if (password1 != password2) {
      errors.push('Passwords do not match')
    }
  }).then(function(){
    if (existingUser) {
      errors.push('Username already taken')
    }
  }).then(function(){
    if (username === "") {
      errors.push("Username can't be blank")
    }
  }).then(function(){
    if (password1 === "" && password2 === "") {
      errors.push('A password is required')
    }
  }).then(function(){
    if ((password1 != "" && password2 === "") || (password2 != "" && password1 === "")) {
      errors.push('Please enter your password twice')
    }
  }).then(function(){
    if (errors.length === 0) {
      models.User.create({
        username: username,
        password: password1
      }).then(function(){
        req.session.username = username
      }).done(function(){
        res.redirect('/chat')
      })
    }
    else {
      res.render('index', {title: 'GIFScript', errors: errors})
    }
  })
})

module.exports = router;
