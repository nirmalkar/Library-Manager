const mongoose = require('mongoose')
const bookSchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String

})



module.exports = mongoose.model('Book', bookSchema);