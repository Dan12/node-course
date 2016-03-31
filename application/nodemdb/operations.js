var assert = require('assert');

// databse, document, collection, callback to return the result of the insertion
exports.insertDocument = function(db, document, collection, callback) {
      // Get the documents collection
  var coll = db.collection(collection);
      // Insert some documents
      // documents that we want to insert and a callback
  coll.insert(document, function(err, result) {
    assert.equal(err, null);
    console.log("Inserted " + result.result.n + " documents into the document collection "
                 + collection);
    callback(result);
  });
};

// find all documents in the collection and return them to the callback
exports.findDocuments = function(db, collection, callback) {
  // Get the documents collection
  var coll = db.collection(collection);
    
  // Find some documents
  // docs returned as javascript array of JSON objects
  coll.find({}).toArray(function(err, docs) {
    assert.equal(err, null);
    console.log("Docs found in "+collection+" with filter {}")
    callback(docs);
  });
};

exports.removeDocument = function(db, document, collection, callback) {

  // Get the documents collection
  var coll = db.collection(collection);

  // Delete the document
  // delete the first document that matches the document filter provided
  coll.deleteOne(document, function(err, result) {
    assert.equal(err, null);
    console.log("Removed the document " + document);
    callback(result);
  });
};

exports.updateDocument = function(db, document, update, collection, callback) {

  // Get the documents collection
  var coll = db.collection(collection);

  // Update document
  // update the first document that matches the criteria
  coll.updateOne(document
        // specify the fields to update in the document
    , { $set: update }, null, function(err, result) {

    assert.equal(err, null);
    console.log("Updated the document with " + update);
    callback(result);
  });
};