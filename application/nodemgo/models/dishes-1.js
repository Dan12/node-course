var mongoose = require("mongoose");
var Schema = mongoose.Schema

var dishSchema = new Schema({
    name:{
       type: String,
       required: true,
       // unique name, runtime exception thrown
       unique: true
    },
    description:{
        type: String,
        required: true
    }
    // additional option for timestamps
}, {
    timestamps: true
});

// create a model using the schema
// When mongoose create the collection with the plural of the name specifed
var Dishes = mongoose.model("Dish", dishSchema);

module.exports = Dishes;