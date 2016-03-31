var express = require("express");
var morgan = require("morgan");
    
var port = 8080;

var app = express();

app.use(morgan('dev'));

var dishRouter = require("./dmod");

// uses dishRouter for all urls starting with /dishes
app.use("/dishes",dishRouter.dr);

app.use(express.static(__dirname+"/public"));

app.listen(port);