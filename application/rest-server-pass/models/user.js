// user model

var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var passportLocalMongoose = require("passport-local-mongoose");

// passport local mongoose automatically adds username and password if not included
// could add other fields later
var User = new Schema({
    username: String,
    password: String,
    firstname: {
      type: String,
        default: ''
    },
    lastname: {
      type: String,
        default: ''
    },
    
    OauthId:String,
    OauthToken:String,
    
    admin: {
        type: Boolean,
        default: false
    }
});

// schema instance method
// construct the full name of the user
User.methods.getName = function() {
    return (this.firstname + ' ' + this.lastname);
};

// use the passport local mongoose plugin
User.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", User);