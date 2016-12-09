module.exports = function (app,model){



    app.get("/api/map/", mapIdToName);

    function mapIdToName(req, res){
        model.commentModel.mapIdToName()
            .then(
                function(map){
                    res.json(map);
                },
                function(error){
                    res.sendStatus(400).send(error);
                }
            )
    }



    app.post("/api/gif/:gifId/comment", createComment);

    function createComment(req, res){

        var comment = req.body;

        model.gifModel.findGifById(comment._gif)
            .then(
                function(gifs){
                    if(gifs){

                        comment._gif = gifs[0];
                        var gifId = gifs[0]._id;

                        model.commentModel.createComment(comment)
                            .then(
                                function (comment) {

                                    res.json(comment);

                                },
                                function (error) {
                                    console.log(error);
                                    res.sendStatus(400).send(error);
                                }
                            );



                    }else{
                        console.log("null gifs");
                        comment._gif = null;

                    }
                },
                function(error){
                    console.log(error);
                    res.sendStatus(400).send(error);
                }
            );


    }

    app.get("/api/gif/:gifId/comment", findCommentsByGifId);

    function findCommentsByGifId(req, res) {

        var gifId = req.params.gifId;
        model.gifModel.findGifById(gifId)
            .then(
                function(gifs){
                    if(gifs){

                        model.commentModel.findAllCommentsForGif(gifs[0])
                            .then(
                                function(comments){
                                    if(comments){
                                       // console.log(comments);
                                        res.send(comments);
                                    }else{
                                        res.send([]);
                                    }
                                },
                                function(error){
                                    res.sendStatus(400).send(error);
                                }
                            );
                    } else{
                        res.send([]);
                    }

                },
                function(error){
                    res.sendStatus(400).send(error);
                }
            );
    }

    app.get("/api/comment/:commentId", findCommentById);

    function findCommentById(req, res) {
        /*var commentId = req.params.commentId;
        var commentAns = null;
        for (i = 0; i < comments.length; i++) {
            if (comments[i]._id === commentId) {
                commentAns = comments[i];
            }
        }
        res.json(commentAns);*/
        var commentId = req.params.commentId;

        model.commentModel.findCommentById(commentId)
            .then(
                function(comments){

                    res.json(comments[0]);
                },
                function(error){
                    res.sendStatus(400).send(error);
                }
            );
    }

    app.put("/api/comment/:commentId", updateComment);

    function updateComment(req, res) {
        /*var commentId = req.params.commentId;
        var commentUpdate = req.body;
        for (i = 0; i < comments.length; i++) {
            if (comments[i]._id === commentId) {
                if(tempImages.length==0) {
                    comments[i] = commentUpdate;
                }else{
                    comments[i] = tempImages[0];
                    tempImages = [];
                }
            }*/
            var commentId = req.params.commentId;
            var commentUpdate = req.body;
            model.commentModel.updateComment(commentId, commentUpdate)
                .then(
                    function(comment){
                        res.json(commentUpdate);
                    },
                    function(error){
                        res.sendStatus(400).send(error);
                    }
                );
        //}


        //res.json(commentUpdate);
    }


    app.delete("/api/comment/:commentId",deleteComment);

    function deleteComment(req, res) {

        var commentId = req.params.commentId;
        console.log(commentId);

        model.commentModel.deleteComment(commentId)
            .then(
                function(status){
                    res.sendStatus(200);
                },
                function(error){
                    res.sendStatus(400).send(error);
                }
            );


    }

    app.delete("/api/allComments/:gifId",deleteAllCommentsForGif);

    function deleteAllCommentsForGif(req, res){
        var gifId = req.params.gifId;
        model.commentModel.deleteAllCommentsForGif(gifId)
            .then(
                function(status){
                    res.sendStatus(200);
                },
                function(error){
                    res.sendStatus(400).send(error);
                }
            );
    }

    app.put("/gif/:gifId/comment",sortComments);

    function sortComments(req, res){
        var start = req.query.initial;
        var end = req.query.final;
        var comment = req.body;

        model.commentModel.sortComments(comment,start,end)
            .then(
                function(comment){
                    res.send(comment);
                },
                function(error){
                    res.sendStatus(400).send(error);
                }
            );

        //res.json(comments);
    }
}
