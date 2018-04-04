var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var index = require('./routes/index');
var login = require('./routes/login');
var signUp = require('./routes/signUp');
var users = require('./routes/users');

var testSound = require('./routes/test');
var sImage = require('./routes/solveImage');

var dashboard = require('./routes/dashboard');
var type1 = require('./routes/type1');
var type2 = require('./routes/type2');
var s3 = require('./routes/s3');
//var s3 = require('./routes/s3');
var db = require('./routes/db');

var app = express();

mongoose.connect('mongodb://localhost:27017/zejjibeck');
mongoose.Promise = global.Promise;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.use('/login', login);
app.use('/signUp', signUp);
app.use('/s3', s3);
app.use('/db', db);

app.use('/testSound', testSound);
app.use('/solveImage', sImage);


app.use('/dashboard', dashboard);
app.use('/type1', type1);
app.use('/type2', type2);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
