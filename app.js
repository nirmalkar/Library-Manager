const express = require('express')
const app = express()




const PORT = process.env.PORT || 2000
app.listen(PORT, function () {
  console.log(`listening at the port ${PORT}`)
})