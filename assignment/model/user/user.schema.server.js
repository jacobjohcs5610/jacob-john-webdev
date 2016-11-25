module.exports=function(mongoose){
    var websiteSchema = require("../website/website.schema.server.js")(mongoose);
    var UserSchema = mongoose.Schema({
        username: String,
        password: String,
        firstName: String,
        lastName: String,
        email: String,
        phone: String,
        websites: [websiteSchema],
        facebook: {
            id:    String,
            token: String
        },
        dateCreated: {type: Date, default: Date.now}
    });

    return UserSchema;
};
