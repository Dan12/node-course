var express = require('express');
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");
// managing functions for user and verifying user identities
var Verify = require("./verify");
//var mongoose = require('mongoose');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post("/register", function(req, res){
    // user tries to register with a username and a password
    // User.register(new User({ username: req.body.username}),
    // callback function returns the new user if successful
    // req.body.password, function(err, user){
    //     if(err) {
    //         return res.status(500).json({err:err});
    //     }
    //     // crosscheck to make sure user correctly created
    //     passport.authenticate("local")(req, res, function(){
    //       return res.status(200).json({status:"Registration Successful!"}); 
    //     });
    // }
    // );
    
    User.register(new User({ username : req.body.username }),
        req.body.password, function(err, user) {
        if (err) {
            return res.status(500).json({err: err});
        }
        
        // the firstname and lastname and then save
        if(req.body.firstname) {
            user.firstname = req.body.firstname;
        }
        if(req.body.lastname) {
            user.lastname = req.body.lastname;
        }
        // save the user
        user.save(function(err,user) {
          if(err) throw err;
          
            passport.authenticate('local')(req, res, function () {
                return res.status(200).json({status: 'Registration Successful!'});
            });
        });
    });
});

router.post('/login', function(req, res, next) {
  // authenticate the user using local authenticate
  passport.authenticate('local', function(err, user, info) {
    // callback function, check to see if user login was successful
    if (err) {
      return next(err);
    }
    // not registered user or incorrect password
    if (!user) {
      return res.status(401).json({
        err: info
      });
    }
    // log in the user
    req.logIn(user, function(err) {
      if (err) {
        return res.status(500).json({
          err: 'Could not log in user'
        });
      }
        
        // generate user token to return to the client
      var token = Verify.getToken(user);
              res.status(200).json({
        status: 'Login successful!',
        success: true,
        token: token
      });
    });
  })(req,res,next);
});

router.get('/logout', function(req, res) {
    // passport supported function to logout the user
    req.logout();
    // should also destroy the user token here so that the user cannot access the information
  res.status(200).json({
    status: 'Bye!'
  });
});

router.get("/query", Verify.verifyOrdinaryUser, Verify.verifyAdminUser, function(req, res){
  User.find({}, function(err, user){
       if(err) throw err;
       
       // return all items in user collection as an array
       // ship data back to client
       // header will be automatically set to 200
       res.json(user)
    });
  
  
})

// facebook stuff
// /users/facebook
router.get('/facebook', passport.authenticate('facebook'),
  function(req, res){});


// facebook authenticate callback url
router.get('/facebook/callback', function(req,res,next){
  // authenticate with pasport
  passport.authenticate('facebook', function(err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({
        err: info
      });
    }
    //try to log in the user
    req.logIn(user, function(err) {
      if (err) {
        return res.status(500).json({
          err: 'Could not log in user'
        });
      }
      // create a token for the user and return it to the user
      var token = Verify.getToken(user);
      res.status(200).json({
        status: 'Login successful!',
        success: true,
        token: token
      });
    });
  })(req,res,next);
});

module.exports = router;
