var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var authenicate = require("./authenticate")

var mongoose = require("mongoose");

var passport = require("passport");
// var LocalStrategy = require("passport-local").Strategy;


var config = require("./config")

// connect to mongo db
mongoose.connect(config.mongoUrl);
// set the db to mongoose.connection
var db = mongoose.connection;

// react to connection event
db.on("error", console.error.bind(console, "connection error"));
// triggered only once
db.once("open", function(){
   
   console.log("Connected");

});

var routes = require('./routes/index');
var users = require('./routes/users');
// dish router
var dishRouter = require('./routes/dishRouter');

var app = express();

// secure traffic only
// middleware on all function call to all urls
// app.all("*", function(req, res, next){
//   // if the url is secure, proceed normally
//   if(req.secure){
//     return next();
//   }
  
//   // if not secure, redirect to secure url
//   res.redirect("https://"+req.hostname+":"+app.get("secPort")+req.url)
// })

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// var User = require("./models/user");
// initialize passport
app.use(passport.initialize());
// strategy exported by user model, which is created in passport-local-mongoose
// passport.use(new LocalStrategy(User.authenticate()));
// two methods that are made use of in passport module
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());


app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.use('/dishes', dishRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers
// if the url is not / or /users, 
// this app cannot handle it so there is an error

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    // angular or ionic applications that know how to handle json
    res.json({
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: {}
  });
});

// this is a module that is used by another node.js application
module.exports = app;
