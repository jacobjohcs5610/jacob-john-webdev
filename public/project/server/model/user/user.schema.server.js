module.exports=function(mongoose){
    var topicSchema = require("../topic/topic.schema.server.js")(mongoose);
    var ProjectUserSchema = mongoose.Schema({
        username: String,
        password: String,
        firstName: String,
        lastName: String,
        email: String,
        phone: String,
        admin: Boolean,
        topics: [topicSchema],
        dateCreated: {type: Date, default: Date.now}
    }, {collection: "projectusers"});

    return ProjectUserSchema;
};
