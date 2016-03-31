var express = require("express");
var morgan = require("morgan");
  
var session = require("express-session");
var FileStore = require("session-file-store")(session);
var port = 8080;

var app = express();

// first do the logging
app.use(morgan('dev'));

app.use(session({
    name:"session-id",
    secret: '12345-67890-09876-54321',
    saveUninitialized: true,    // if the incoming request has a cookie, it gets stored so the first request creates the new session
    resave: true,
    store: new FileStore()
}));

// then do the authentication

// function that can be used as middleware in application
function auth (req,res,next){
    console.log(req.headers)
    
    // check if session has been created
    if(!req.session.user){
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
            // session information is tracked on the server side
            // set value of user of session
            req.session.user="admin";
            
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
        if(req.session.user == "admin"){
            console.log("req.session: ");
            console.log(req.session);
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