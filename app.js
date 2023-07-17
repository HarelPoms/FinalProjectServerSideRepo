var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const initialData = require("./initialData/initialData");

const apiRouter = require("./routes/api");

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
initialData();

app.use("/api", apiRouter);

module.exports = app;
