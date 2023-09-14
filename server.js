var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var passport = require('passport');
var methodOverride = require('method-override');

require('dotenv').config();
// connect to the database  AFTER the config vars are processed
require('./config/database');
require('./config/passport');

// My routes go here
const indexRouter = require('./routes/index');
const recipesRouter = require('./routes/recipes');
const ingredientsRouter = require('./routes/ingredients');
const commentsRouter = require('./routes/comments');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));

// middleware for generating sessions and signing them with .env SECRET
app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true
}));

// PASSPORT MIDDLEWARE
app.use(passport.initialize());
app.use(passport.session());

// ADD req.user TO ALL VIEWS
app.use(function (req, res, next) {
  res.locals.user = req.user;
  next();
});

// ROUTES BEGIN HERE
app.use('/', indexRouter);
app.use('/recipes', recipesRouter);
app.use('/', ingredientsRouter);
app.use('/', commentsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
