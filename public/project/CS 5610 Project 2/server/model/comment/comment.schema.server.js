module.exports = function(mongoose){

    var commentSchema = mongoose.Schema({

        _gif: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Gif'
        },
        _user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        name: String,
        text: String,
        order: Number,
        dateCreated: {type: Date, default: Date.now}


    });

    return commentSchema;
};
