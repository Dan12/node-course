var express = require("express");
var morgan = require("morgan");
  
var cookieParser = require("cookie-parser");
    
var port = 8080;

var app = express();

// first do the logging
app.use(morgan('dev'));
// cookie signing secret, server signs the cookie before sending it to the client so that client can't modify the cookie
// cookie made available in req object
app.use(cookieParser("12345-67890-09876-54321"));

// then do the authentication

// function that can be used as middleware in application
function auth (req,res,next){
    console.log(req.headers)
    
    // check if user has not been verified yet (has no cookie attached)
    if(!req.signedCookies.user){
        // expect useranme and password to come in through the headers
        var authHeader = req.headers.authorization;
        // if authorization is null throw an error
        if(!authHeader){
            var err = new Error("you are not authorizatized");
            // unauthorized code
            err.status = 401;
            // automaticaly raises the error, and skips all remaining middleware besides the error handler
            next(err);
            return;
        }
        // authorization header like so:  authorization: 'Basic YWRtaW46cGFzc3dvcmQ='
        // that is why we split the initial string on a space and get the second value
        // extract string from base64 header and split the string between the username and password
        var auth = new Buffer(authHeader.split(" ")[1], "base64").toString().split(":");
        var user = auth[0];
        var pass = auth[1];
        if(user == "admin" && pass=="password"){
            // name of cookie, vaule of the cookie, additional option
            // cookie valid as long as browser session is running (ended when browser shutdown)
            res.cookie("user","admin",{signed:true})
            
            // authorized
            next();
        }
        else{
            var err = new Error("you are not authorizatized");
            // unauthorized code
            err.status = 401;
            // automaticaly raises the error, and skips all remaining middleware besides the error handler
            next(err);
        }
    }
    // assume user has been authenticated and a cookie in the header
    else{
        if(req.signedCookies.user == "admin"){
            console.log(req.signedCookies);
            next();
        }
        // invalid user
        else{
            var err = new Error("you are not authorizatized");
            // unauthorized code
            err.status = 401;
            // automaticaly raises the error, and skips all remaining middleware besides the error handler
            next(err);
        }
    }   
    
}
// use middleware function
app.use(auth);

// var dishRouter = require("./dmod");

// // uses dishRouter for all urls starting with /dishes
// app.use("/dishes",dishRouter.dr);

// then server static files

app.use(express.static(__dirname+"/public"));

// error handeling middleware
app.use(function(err, req, res, next) {
    
    res.writeHeader(err.status || 500, {
        // reminding cleint to do  basic authentication
       "WWW-Authenticate":"Basic" ,
       "Content-Type":"text/plain"
    });
    
    // add error message that was generated to the end of the responsen
    res.end(err.message);
})

app.listen(port);