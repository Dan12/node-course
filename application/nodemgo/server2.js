var mongoose = require("mongoose");
var assert = require("assert");

var Dishes = require("./models/dishes-1");

var url = "mongodb://dan121-learn-node-2419567:27017/conFusion";

// connect to mongo db
mongoose.connect(url);
// set the db to mongoose.connection
var db = mongoose.connection;

// react to connection event
db.on("error", console.error.bind(console, "connection error"));
// triggered only once
db.once("open", function(){
   
   console.log("Connected");
   
   // new creation method
   Dishes.create({
       name: "Pizza",
       description: "Test"
   }, function(err, dish){
      if (err) console.log(err);
      
      else{
          console.log("Dish created");
          console.log(dish);
          var id = dish._id;
          
          // paused to see the change in updatedAt and createdAt field
          setTimeout(function(){
              // querying and updating
            Dishes.findByIdAndUpdate(id, {
               // specify what to update
               $set: {
                   description: "Updated text"
               }
                
            }, {
                // ask to return the updated dish
                // if not set or false, returns old dish
                new: true
            } 
            )
            .exec(function(err, dish){
                if(err) throw err;
                console.log("Updated");
                console.log(dish);
                
                db.collection("dishes").drop(function(){
                    db.close();
                })
            })
          }, 3000);
      }
   });
});