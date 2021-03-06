// create web token and verify a users web token
var User = require('../models/user');
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config = require('../config.js');

// send the token to the user for a vaidated user
exports.getToken = function (user) {
    // expires in 1 hour
    // jwt contains all user data
    return jwt.sign(user, config.secretKey, {
        expiresIn: 3600
    });
};

exports.verifyOrdinaryUser = function (req, res, next) {
    // check header or url parameters or post parameters for token
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    // decode token
    // make sure token is not null
    if (token) {
        // verifies secret and checks expiration time
        jwt.verify(token, config.secretKey, function (err, decoded) {
            // callback function with decoded dat
            if (err) {
                var err = new Error('You are not authenticated!');
                err.status = 401;
                return next(err);
            } else {
                // if everything is good, save to request for use in other routes
                req.decoded = decoded;
                next();
            }
        });
    } else {
        // if there is no token
        // return an error
        var err = new Error('No token provided!');
        err.status = 403;
        return next(err);
    }
};

exports.verifyAdminUser = function (req, res, next) {
    // check header or url parameters or post parameters for token
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    // decode token
    // make sure token is not null
    if (token) {
        // verifies secret and checks expiration time
        jwt.verify(token, config.secretKey, function (err, decoded) {
            // callback function with decoded dat
            if (err) {
                var err = new Error('You are not authenticated!');
                err.status = 401;
                return next(err);
            } else {
                // if everything is good, save to request for use in other routes
                req.decoded = decoded;
                
                console.log(req.decoded);
                
                if(req.decoded._doc.admin){
                    next();
                }
                else{
                    var err = new Error('You are not authorized for this action!');
                    err.status = 401;
                    return next(err);
                }
            }
        });
    } else {
        // if there is no token
        // return an error
        var err = new Error('No token provided!');
        err.status = 403;
        return next(err);
    }
}