var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var comanyRouter = require('./routes/company');
var staffRouter = require('./routes/staffPage');
var shopRouter = require('./routes/shop')
const config = require("./config/index")
const passport = require("passport")

const errorHandler = require('./middleware/errorHandler')

var app = express();

//over there connetDB
mongoose.connect(config.MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false});

app.use(logger('dev'));
app.use(express.json({
    limit: '50mb'
}));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize())

app.use('/', indexRouter);
app.use('/user', usersRouter);
app.use('/company', comanyRouter);
app.use('/staff', staffRouter);
app.use('/shop',shopRouter)

app.use(errorHandler)


module.exports = app;
