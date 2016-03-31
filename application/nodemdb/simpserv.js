var MongoClient = require("mongodb").MongoClient
var assert = require("assert")

// connection url
//var url = "mongodb://"+process.env.IP+"/conFusion";
var url = "mongodb://dan121-learn-node-2419567:27017/conFusion";

// connect to the server
MongoClient.connect(url, function(err, db){
    if(err){
        console.log("Error:");
        console.log(err);
    }
    else{
        console.log("Connected");
        
        var collection = db.collection("dishes");
        
        // insert one document
        collection.insertOne({
            name:"Pizza dish",
            description: "A dish"
        }, function(err,result){
           if(err){
               console.log("Error")
           } 
           else{
               console.log("Inserted")
               // contain array of all documents inserted by insert operation
               console.log(result.ops)
               
               // Callback function used because DB functions take time
               // after insertion, query
               //             Filter
               collection.find({}).toArray(function(err,docs){
                  if(err){
                      console.log(err);
                  } 
                  else{
                      console.log("Found");
                      console.log(docs)
                      
                      db.dropCollection("dishes", function(err,result){
                          assert.equal(err,null);
                          console.log(result);
                          db.close();
                      });
                  }
               });
               
           }
        });
    }
});