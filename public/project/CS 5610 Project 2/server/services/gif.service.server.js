module.exports = function (app,model){





    app.post("/api/topic/:topicId/gif", createGif);

    function createGif(req,res){

        var gif = req.body;
        var topicId = gif.topicId;
        model.topicModel.findTopicById(topicId)
            .then(
                function(topics){
                    if(topics){
                        gif._topic = topics[0];
                        model.gifModel.createGif(topicId, gif)
                            .then(
                                function(gif){
                                    res.json(gif);
                                },
                                function(error){
                                    res.sendStatus(400).send(error);
                                }
                            );
                    } else{
                        res.json(null);
                    }
                },
                function(error){
                    res.sendStatus(400).send(error);
                }
            );
    }

    app.get("/api/topic/:topicId/gif",findGifByTopicId);

    function findGifByTopicId(req, res) {


        var topicId = req.params.topicId;
        model.topicModel.findTopicById(topicId)
            .then(

                function(topics){
                    if(topics){
                        var topic = topics[0];
                        model.gifModel.findAllGifsForTopic(topic)
                            .then(
                                function(gifs){
                                    if(gifs){
                                        res.send(gifs);
                                    }else{
                                        res.send([]);
                                    }
                                },
                                function(error) {
                                    res.sendStatus(400).send(error);
                                }
                            );
                    }else{
                        res.send([]);
                    }
                },
                function(error){
                    res.sendStatus(400).send(error);
                }
            );
    }

    app.get("/api/gif/:gifId",findGifById);

    function findGifById(req, res){


       var gifId = req.params.gifId;
        model.gifModel.findGifById(gifId)
            .then(
                function(gifs){
                    res.json(gifs[0]);
                },
                function(error){
                    res.sendStatus(400).send(error);
                }
            );
    }

    app.put("/api/gif/:gifId",updateGif);

    function updateGif(req, res) {

        var gifId = req.params.gifId;
        var gifUpdate = req.body;
        model.gifModel.updateGif(gifId,gifUpdate)
            .then(
                function(gif){
                    res.json(gifUpdate);
                },
                function(error){
                    res.sendStatus(400).send(error);
                }
            );
    }

    app.delete("/api/gif/:gifId", deleteGif);

    function deleteGif(req, res) {

        var gifId = req.params.gifId;
        model.gifModel.deleteGif(gifId)
            .then(
                function(status){
                    res.send(200);
                },
                function(error){
                    res.sendStatus(400).send(error);
                }
            )
    }



};