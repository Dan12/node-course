var express = require("express")
var morgan = require("morgan");
var bodyParser = require("body-parser");
    
var port = 8080;

var app = express();

app.use(morgan('dev'));

// parse body json data to javascript object
app.use(bodyParser.json());

app.all("/dishes", function(req,res,next){
    
    res.writeHead(200, {"Content-Type":"text/plain"});
    
    // goes to next function that does an action on /dishes
    next();
    
});

app.get("/dishes", function(req,res,next){
    res.end("Get received");
});

app.post("/dishes", function(req,res,next){
    res.end("Post received, name: "+req.body.name+" desc: "+req.body.description);
});

app.delete("/dishes", function(req,res,next){
    res.end("Delete received");
});

app.get("/dishes/:dId", function(req,res,next){
    res.end("Get received for "+req.params.dId);
});

app.put("/dishes/:dId", function(req,res,next){
    res.write("Updating "+req.params.dId+"\n");
    res.end("put received for "+req.params.dId);
});

app.delete("/dishes/:dId", function(req,res,next){
    res.end("Delete received for "+req.params.dId);
});

app.use(express.static(__dirname+"/public"));

app.listen(port);