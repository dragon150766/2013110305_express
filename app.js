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


var app = express();

//over there connetDB
mongoose.connect('mongodb+srv://Siripong:2013110305@2013110305-fluk.lwcv68e.mongodb.net/restfulapi?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/company', comanyRouter);
app.use('/staff', staffRouter);
app.use('/shop',shopRouter)




module.exports = app;
