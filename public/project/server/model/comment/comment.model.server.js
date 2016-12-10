module.exports = function(mongoose){

    var CommentSchema = require("./comment.schema.server.js")(mongoose);

    var CommentModel = mongoose.model("CommentModel",CommentSchema);

    var api={
        createComment: createComment,
        findAllCommentsForGif: findAllCommentsForGif,
        findCommentById: findCommentById,
        updateComment: updateComment,
        deleteComment: deleteComment,
        updateImageUrl: updateImageUrl,
        sortComments: sortComments,
        deleteAllCommentsForGif: deleteAllCommentsForGif,
        findCommentsWithUsernameByGifId: findCommentsWithUsernameByGifId,
        deleteAllCommentsForGifs: deleteAllCommentsForGifs
    }

    return api;

    function findCommentsWithUsernameByGifId(gifId){
        return CommentModel.find({_gif: gifId}).populate('_user','username').sort({dateCreated: -1});
    }


    function createComment(comment){
        //comment.order = CommentModel.count()+1;
        return CommentModel.count()
            .then(
                function(count){
                    comment.order = count;
                    return CommentModel.create(comment);
                },
                function(error){
                    return error;
                }
            )
        //return CommentModel.create(comment);
    }

    function findAllCommentsForGif(gif){
        return CommentModel.find({_gif: gif}).sort({dateCreated: -1});
    }

    function findCommentById(commentId){
        return CommentModel.find({_id: commentId});
    }

    function updateComment(commentId, comment){
        return CommentModel.update(
            {_id: commentId},

                comment

        );
    }

    function deleteAllCommentsForGifs(gifs){
        return CommentModel.remove({_gif: {$in: gifs}});
    }

    function deleteAllCommentsForGif(gifId){
        return CommentModel.remove({_gif: gifId});
    }

    function deleteComment(commentId){

       return CommentModel.find({_id: commentId})
           .then(
               function(comments){
                   var index = comments[0].order;
                   //console.log(index);
                   return CommentModel.update({order: {$gt: index}},{$inc: {order: -1}}, {multi: true})
                       .then(
                           function(status){
                               return CommentModel.remove({_id: commentId});
                           },
                           function(error){
                               return error;
                            }
                       );
               },
               function(error){
                   return error;
               }
           );

    }

    function updateImageUrl(commentId,url){
        return CommentModel.update(
            {_id: commentId},
            {url: url}
        );
    }


    function sortComments(comment, start, end){
        //console.log(comment);
        return CommentModel.update({order: {$gt: comment.order}},{$inc: {order: -1}},{multi:true})
            .then(
                function(comments){
                    return CommentModel.update({order: {$gt: end-1}},{$inc: {order: 1}},{multi:true})
                        .then(
                            function(comments){
                                return CommentModel.update({_id: comment._id},{order: end});

                            },
                            function(error){
                                return error;
                            }
                        );
                },
                function(error){
                    return error;
                }
            );
    }

};