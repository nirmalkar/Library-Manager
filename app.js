const express = require('express')
const app = express()


app.set('view engine', 'ejs')

app.get('/', function (req, res) {
  res.render('landing')
})



const PORT = process.env.PORT || 2000
app.listen(PORT, function () {
  console.log(`listening at the port ${PORT}`)
})