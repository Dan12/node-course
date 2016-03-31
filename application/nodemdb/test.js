// connection url
var url = "mongodb://dan121-learn-node-2419567:27017/conFusion";
console.log(url);

var MongoClient = require("mongodb").MongoClient


MongoClient.connect(url, function(err, db){
    if(err){
        console.log("Error:");
        console.log(err);
    }
    else{
        console.log("Connected");
    }
});