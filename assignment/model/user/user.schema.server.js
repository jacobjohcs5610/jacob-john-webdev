module.exports=function(mongoose){
    //var mongoose = require("mongoose");
    var UserSchema = mongoose.Schema({
        username: String,
        password: String,
        firstName: String,
        lastName: String,
        email: String,
        phone: String,
        //websites: [Website],
        dateCreated: Date
    });

    return UserSchema;
};
