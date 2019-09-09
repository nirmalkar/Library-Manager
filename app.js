const express = require('express')
const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://hemant123:hemant123@cluster0-wjckl.gcp.mongodb.net/test?retryWrites=true&w=majority')



const app = express()


app.set('view engine', 'ejs')

app.get('/', function (req, res) {
  res.render('landing')
})
app.get('/secret', function (req, res) {
  res.render('secret')
})
app.get('/register', function (req, res) {
  res.render('register')
})

app.get('/login', function (req, res) {
  res.render('login')
})



const PORT = process.env.PORT || 2000
app.listen(PORT, function () {
  console.log(`listening at the port ${PORT}`)
})