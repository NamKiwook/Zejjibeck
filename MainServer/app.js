var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var connectHistory = require('connect-history-api-fallback')();
var authMiddleware = require('./routes/middleware/authMiddleware');
var mongoUrl = 'mongodb://localhost:27017/zejjibeck';
var index = require('./routes/index');
var signUp = require('./routes/signUp');
var login = require('./routes/login');
var dashboard = require('./routes/dashboard');
var upload = require('./routes/upload');
var userInfo = require('./routes/userInfo');
var project = require('./routes/project');
var refine = require('./routes/refine');
var credit = require('./routes/credit');
var collect = require('./routes/collect');

var app = express();

mongoose.Promise = global.Promise;
mongoose.connect(mongoUrl);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(){
  console.log('mongodb connection OK.');
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(connectHistory); //ALERT! MUST DELETE THIS ANNOTATE BEFORE USE(IT'S FOR USING POSTMAN)
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//for Vue Develop
app.use('/',index);
app.use('/api/signup',signUp);
app.use('/api/login',login);
app.use('/api',authMiddleware); //인증된 요청인지 체크(Token을 Decode하는 역할도 함)
app.use('/api/dashboard',dashboard);
app.use('/api/upload',upload);
app.use('/api/userInfo',userInfo);
app.use('/api/project',project);
app.use('/api/refine',refine);
app.use('/api/credit',credit);
app.use('/api/collect',collect);

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
