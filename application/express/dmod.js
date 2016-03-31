var express = require("express");
var bodyParser = require("body-parser");

// mini app
var dishRouter = express.Router();
dishRouter.use(bodyParser.json());

// only use / because it is specifed later
dishRouter.route("/")
.all(function(req,res,next){
    res.writeHead(200, {"Content-Type":"text/plain"})
    
    next();
})

.get(function(req,res,next){
    res.end("Get received");
})

.post(function(req,res,next){
    res.end("Post received, name: "+req.body.name+" desc: "+req.body.description);
})

.delete(function(req,res,next){
    res.end("Delete received");
});

dishRouter.route("/:dId")
.all(function(req, res, next) {
    res.writeHead(200, {"Content-Type":"text/plain"})
    
    next();
})

.get(function(req,res,next){
    res.end("Get received for "+req.params.dId);
})

.put(function(req,res,next){
    res.write("Updating "+req.params.dId+"\n");
    res.end("put received for "+req.params.dId);
})

.delete(function(req,res,next){
    res.end("Delete received for "+req.params.dId);
});

exports.dr = dishRouter;