module.exports = function(mongoose){

    var widgetSchema = mongoose.Schema({

        _page: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Page'
        },
        type:  {type: String, enum: ['heading', 'image', 'youtube', 'html', 'text']},
        name: String,
        text: String,
        placeholder: String,
        description: String,
        url: String,
        width: String,
        height: String,
        rows: Number,
        size: Number,
        class: String,
        icon: String,
        deletable: Boolean,
        formatted: Boolean,
        order: Number,
        dateCreated: {type: Date, default: Date.now}


    });

    return widgetSchema;
};
