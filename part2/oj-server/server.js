var express = require("express") // import express package
var app = express()
var restRouter = require("./routes/rest");
var indexRouter = require("./routes/index");
var mongoose = require("mongoose");

mongoose.connect("mongodb://junrui:coj@ds021731.mlab.com:21731/coj");
app.use('/', indexRouter); // root page, route to index
app.use("/api/v1", restRouter);

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
