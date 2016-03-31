var express = require("express");
var bodyParser = require("body-parser");

var mongoose = require('mongoose');

// dishes schema
var Dishes = require("../models/dishes")
var Verify = require("./verify");

// mini app
var dishRouter = express.Router();
dishRouter.use(bodyParser.json());

// only use / because it is specifed later
dishRouter.route("/")
// for dish router
// verify a user
.get(Verify.verifyOrdinaryUser, function(req,res,next){
    //res.end("Get received");
    console.log(req.decoded);
    Dishes.find({}, function(err, dish){
       if(err) throw err;
       
       // return all items in dishes collection as an array
       // ship data back to client
       // header will be automatically set to 200
       res.json(dish)
    });
})

.post(Verify.verifyOrdinaryUser, Verify.verifyAdminUser, function(req,res,next){
    //res.end("Post received, name: "+req.body.name+" desc: "+req.body.description);
                // put the body into the database
    Dishes.create(req.body, function(err, dish){
        if (err) throw err;
        
        console.log("Dish created");
        var id = dish._id;
        
        res.writeHead(200, {
            'Content-Type':'text/plain'
        });
        
        console.log("Ending");
        
        res.end("Added dish with id "+id);
    });
})

.delete(Verify.verifyOrdinaryUser, Verify.verifyAdminUser, function(req,res,next){
    // res.end("Delete received");
    // remove matches all the dishes ({}), so all dishes deleted
    Dishes.remove({}, function(err, resp){
        if(err) throw err;
        
        // indicates how many dishes were deleted
        res.json(resp);
    })
});

dishRouter.route("/:dId")

.get(function(req,res,next){
    // res.end("Get received for "+req.params.dId);
    
    Dishes.findById(req.params.dId, function(err, dish){
        if(err) throw err;
        
        res.json(dish);
    })
})

.put(function(req,res,next){
    // res.write("Updating "+req.params.dId+"\n");
    // res.end("put received for "+req.params.dId);
    
    Dishes.findByIdAndUpdate(req.params.dId, {
        $set: req.body
    }, {
        // callback returns the updated dish
        new: true
    }, function(err,dish){
        if (err) throw err;
        console.log("Updated dish");
        res.json(dish)
    })
})

.delete(function(req,res,next){
    // res.end("Delete received for "+req.params.dId);
    
    Dishes.remove(req.params.dId, function(err, resp) {
        if(err) throw err;
        
        res.json(resp);
    })
});


// handle comments
dishRouter.route("/:dId/comments")

.get(function(req, res, next) {
    
    Dishes.findById(req.params.dId, function(err, dish) {
        if(err) throw err;
        
        res.json(dish.comments);
    })
})

.post(function(req, res, next) {
    
    Dishes.findById(req.params.dId, function(err, dish) {
        
        if(err) throw err;
        
        dish.comments.push(req.body);
        
        dish.save(function(err, dish){
            if(err) throw err;
            
            console.log("Updated comments");
           // console.log(dish);
            res.json(dish);
        })
    })
    
})

// delete all comments
.delete(function(req, res, next) {
    
    Dishes.findByIdAndUpdate(req.params.dId, {
        $set: {
            comments:[]
        }
    }, {
        // callback returns the updated dish
        new: true
    }, function(err,dish){
        if (err) throw err;
        console.log("Deleted all comments")
        res.json(dish)
    })
})


// for individual comments
dishRouter.route("/:dId/comments/:cId")

.get(function(req, res, next) {
    Dishes.findById(req.params.dId, function(err, dish) {
        if(err) throw err;
        
        res.json(dish.comments.id(req.params.cId));
    })
})

.put(function(req, res, next) {
    // delete the existing comment and insert the new comment
    
    Dishes.findById(req.params.dId, function(err, dish) {
        if(err) throw err
        
        var comment = dish.comments.id(req.params.cId);
        // console.log(comment);
        // console.log(req.body);
        for(var key in req.body){
            //console.log(key);
            comment[key] = req.body[key];
        }
        
        dish.save(function(err, dish){
            if(err) throw err;
            console.log("updated comment");
            res.json(dish);
        })
    });
        
})
    
.delete(function(req, res, next){
    
    Dishes.findByIdAndUpdate(req.params.dId, {
        $pull: {
            comments:{
                _id:req.params.cId
            }
        }
    }, {
        // callback returns the updated dish
        new: true
    }, function(err,dish){
        if (err) throw err;
        console.log("Deleted all comments")
        res.json(dish)
    })
    
})

module.exports = dishRouter;