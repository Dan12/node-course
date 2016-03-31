var MongoClient = require('mongodb').MongoClient,
    assert = require('assert');

var dboper = require('./operations');

// Connection URL
var url = "mongodb://dan121-learn-node-2419567:27017/conFusion";

// Use connect method to connect to the Server
MongoClient.connect(url, function (err, db) {
    assert.equal(null, err);
    console.log("Connected correctly to server");

                                // document to insertDocument         // name of the collection
    dboper.insertDocument(db, { name: "Vadonut", description: "Test" }, "dishes", function (result) {   // callback function
            console.log(result.ops);

            dboper.findDocuments(db, "dishes", function (docs) {
                console.log(docs);
                                            // specifying document by name (update first document with this name)
                dboper.updateDocument(db, { name: "Vadonut" },
                    { description: "Updated Test" },    // update the description field
                    "dishes", function (result) {
                        console.log(result.result);

                        dboper.findDocuments(db, "dishes", function (docs) {
                            console.log(docs)

                            db.dropCollection("dishes", function (result) {
                                console.log(result);

                                db.close();
                            });
                        });
                    });
            });
        });
});