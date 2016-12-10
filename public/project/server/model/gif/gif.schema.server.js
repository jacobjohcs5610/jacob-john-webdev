module.exports=function(mongoose){

    var commentSchema = require("../comment/comment.schema.server.js")(mongoose);
    var gifSchema = mongoose.Schema({
        _topic: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'TopicModel'
        },
        _user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'ProjectUserModel'
        },
        url: String,
        width: Number,
        height: Number,
        size: Number,
        dateCreated: {type: Date, default: Date.now}
    });


    return gifSchema;
};
