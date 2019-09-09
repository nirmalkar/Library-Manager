const express = require('express')
const mongoose = require('mongoose')
const passport = require('passport')
const bodyParser = require('body-parser')
const localStrategy = require('passport-local')
const passportLocalMongoose = require('passport-local-mongoose')
const User = require('./models/user')


mongoose.connect('mongodb+srv://hemant123:hemant123@cluster0-wjckl.gcp.mongodb.net/test?retryWrites=true&w=majority')
const app = express()

app.use(require('express-session')({
  secret: 'Downey you are the best',
  resave: false,
  saveUninitialized: false
}))

app.set('view engine', 'ejs')
app.use(passport.initialize())
app.use(passport.session())
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
  res.send('connected')
})


// LEADS TO LOGIN PAGE 
app.get('/login', function (req, res) {
  res.render('login')
})



const PORT = process.env.PORT || 2000
app.listen(PORT, function () {
  console.log(`listening at the port ${PORT}`)
})