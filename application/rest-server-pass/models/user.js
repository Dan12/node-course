// user model

var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var passportLocalMongoose = require("passport-local-mongoose");

// passport local mongoose automatically adds username and password if not included
// could add other fields later
var User = new Schema({
    username: String,
    password: String,
    admin: {
        type: Boolean,
        default: false
    }
});

// use the passport local mongoose plugin
User.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", User);