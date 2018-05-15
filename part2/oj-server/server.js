var express = require("express") // import express package

var app = express()

app.get('/', function(req, res) {
  res.send('Hello Express haha')
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
