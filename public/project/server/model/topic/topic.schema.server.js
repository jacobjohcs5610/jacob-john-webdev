
module.exports=function(mongoose){
    var gifSchema = require("../gif/gif.schema.server.js")(mongoose);

    var TopicSchema = mongoose.Schema({
        _user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'ProjectUserModel'
        },
        name: String,
        description: String,
        gifs: [gifSchema],
        dateCreated: {type: Date, default: Date.now}
    });

    return TopicSchema;
};