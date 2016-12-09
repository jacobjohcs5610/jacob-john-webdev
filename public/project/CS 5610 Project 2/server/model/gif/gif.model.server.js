module.exports = function(mongoose){

    var GifSchema = require("./gif.schema.server.js")(mongoose);

    var GifModel = mongoose.model("GifModel",GifSchema);

    var api={
        createGif: createGif,
        findAllGifsForTopic: findAllGifsForTopic,
        findGifById: findGifById,
        updateGif: updateGif,
        deleteGif: deleteGif,
        deleteAllGifsForTopic: deleteAllGifsForTopic,
        addCommentToGif: addCommentToGif,
        reorderComments: reorderComments
    };

    return api;


    function createGif(topicId, gif){
        return GifModel.create(gif);
    }

    function findAllGifsForTopic(topic){
        return GifModel.find({_topic: topic});
    }

    function findGifById(gifId){
        return GifModel.find({_id: gifId});
    }

    function updateGif(gifId, gif){
        return GifModel.update(
            {_id: gifId},
            {
                name: gif.name,
                title: gif.title
            });
    }

    function deleteGif(gifId){
        return GifModel.remove({_id: gifId});
    }

    function deleteAllGifsForTopic(topicId){
        return GifModel.remove({_topic: topicId});
    }

    function addCommentToGif(gifId, comment){
        console.log(comment._id);
        console.log(gifId);
        return GifModel.update(
            {_id: gifId},
            {$push: {comments: comment._id}}
        );
    }

    function reorderComments(gifId, comment, end){
        var target =GifModel.update(
            {_id: gifId},
            {$pull: {comments: comment._id}}
        );
        return GifModel.update(
            {_id: gifId},
            {$push: {comments: {$each:[comment._id], $position: end}}}
        );
    }



};