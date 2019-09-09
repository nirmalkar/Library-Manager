const express = require('express')
const mongoose = require('mongoose')
const passport = require('passport')
const bodyParser = require('body-parser')
const localStrategy = require('passport-local')
const passportLocalMongoose = require('passport-local-mongoose')
const User = require('./models/user')

mongoose.connect('mongodb+srv://hemant123:hemant123@cluster0-wjckl.gcp.mongodb.net/test?retryWrites=true&w=majority')

const app = express()
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(require('express-session')({
  secret: 'Downey you are the best',
  resave: false,
  saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())

passport.use(new localStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())
// *********************************************
// ROUTES
// *********************************************

// LEADS TO LANDING PAGE 
app.get('/', function (req, res) {
  res.render('landing')
})

// LEADS TO SECRET PAGE
app.get('/secret', function (req, res) {
  res.render('secret')
})

// FOR SIGN UP FORM 
app.get('/register', function (req, res) {
  res.render('register')
})
//POST METHOD FOR REGISTER
app.post('/register', function (req, res) {
  req.body.username
  req.body.password
  User.register(new User({ username: req.body.username }), req.body.password, function (err, user) {
    if (err) {
      console.log(err)
      return res.render('register')
    }
    passport.authenticate('local')(req, res, function () {
      res.redirect('/secret')
    })
  })
})


// LEADS TO LOGIN PAGE 
app.get('/login', function (req, res) {
  res.render('login')
})
//POST for login 
//middleware-runs before and final route call
app.post('/login', passport.authenticate('local', {
  successRedirect: '/secret',
  failureRedirect: '/login'
}), function (req, res) {
})



const PORT = process.env.PORT || 2000
app.listen(PORT, function () {
  console.log(`listening at the port ${PORT}`)
})