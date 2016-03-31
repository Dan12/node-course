var mongoose = require("mongoose");
var Schema = mongoose.Schema

// Will add the Currency type to the Mongoose Schema types
require('mongoose-currency').loadType(mongoose);
var Currency = mongoose.Types.Currency;

var commentSchema = new Schema({
    // min and max to assure that rating is a valid value
    rating:  {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    comment:  {
        type: String,
        required: true
    },
    author:  {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

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
    },
    category:{
        type: String,
        required: true
    },
    label:{
        type: String,
        default: ""
    },
    price:{
        type: Currency,
        required: true
    },
    // create an array of comment schemas
    comments:[commentSchema]
    // additional option for timestamps
}, {
    timestamps: true
});

// create a model using the schema
// When mongoose create the collection with the plural of the name specifed
var Dishes = mongoose.model("Dish", dishSchema);

module.exports = Dishes;