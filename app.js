const express = require('express')
const mongoose = require('mongoose')
const passport = require('passport')
const bodyParser = require('body-parser')
const localStrategy = require('passport-local')
const passportLocalMongoose = require('passport-local-mongoose')
const User = require('./models/user')
let Book = require('./models/books')

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


// Book.create(
//   {
//     name: 'The Alchemist',
//     image: 'https://images.pexels.com/photos/1687845/pexels-photo-1687845.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
//     description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit, repellendus?'
//   },
//   function (err, book) {
//     if (err) {
//       console.log(err)
//     } else {
//       console.log('New book added')
//       console.log(book)
//     }
//   }
// )

// *****************************************************

// *********************************************
// ROUTES
// *********************************************

// LEADS TO LANDING PAGE 
app.get('/', function (req, res) {
  res.render('landing')
})


app.get('/books', function (req, res) {
  //  get all the books from db
  Book.find({}, function (err, allBooks) {
    if (err) {
      console.log(err)
    } else {
      res.render('index', { books: allBooks })

    }
  })
})

app.post('/books', function (req, res) {
  //take data from form and add it to books array
  let name = req.body.name
  let image = req.body.image
  let desc = req.body.description
  let newBook = { name: name, image: image, description: desc }
  //create a new book and save it to database
  Book.create(newBook, function (err, newlyCreated) {
    if (err) {
      console.log(err)
    } else {
      //redirect back to books page
      res.redirect('/books')
    }
  })
})


// LEADS TO SECRET PAGE
app.get('/secret', isLoggedIn, function (req, res) {
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

app.get('/logout', function (req, res) {
  req.logout()
  res.redirect('/')
})
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login')
}

app.get('/books/:id', function (req, res) {
  Book.findById(req.params.id, function (err, foundBook) {
    if (err) {
      console.log(err)
    } else {
      // render the show template
      res.render('show', { book: foundBook })
    }
  })
})

const PORT = process.env.PORT || 2000

app.listen(PORT, function () {
  console.log(`listening at the port ${PORT}`)
})