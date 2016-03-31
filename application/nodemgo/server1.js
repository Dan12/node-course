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
   
   var newDish = Dishes({
       name: "Pizza",
       description: "Text"
   });
   
   // one way of creating a dish
   newDish.save(function(err){
       if (err) throw err
       
       console.log("Dish created")
       
       Dishes.find({}, function(err, dishes){
           if(err) throw err;
           
           console.log(dishes);
           
           db.collection("dishes").drop(function(){
               db.close();
           })
           
       })
   })
});