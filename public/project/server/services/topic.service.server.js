module.exports = function(app,model){


    app.get("/api/project/allTopic", findAllTopics);

    function findAllTopics(req,res){

        model.topicModel.findAllTopics()
            .then(
                function(topics){
                    res.json(topics);
                },
                function(error){
                    res.sendStatus(400).send(error);
                }
            );
    }



    app.post("/api/project/user/:userId/topic", createTopic);

    function createTopic(req, res){

        var topic = req.body;

        topic._user = null;
        model.userModel.findUserById(topic.developerId)
            .then(
                function(users){
                    if(users){
                        topic._user = users[0];

                        model.topicModel.createTopicForUser(topic.developerId,topic)
                            .then(
                                function(topic){
                                    res.json(topic);
                                },
                                function(error){
                                    res.sendStatus(400).send(error);
                                }
                            );

                    }else{
                        topic._user = null;
                    }
                },
                function(error){
                    res.sendStatus(400).send(error);
                }
            );



    }

    app.get("/api/project/user/:userId/topic",findTopicsByUser);

    function findTopicsByUser(req,res){

        var userId = req.params.userId;
        var user = null;
        model.userModel.findUserById(userId)
            .then(
                function(users){
                    if(users){
                        user = users[0];
                        model.topicModel.findAllTopicsForUser(user)
                            .then(
                                function(topics){
                                    res.send(topics);
                                },
                                function(error){
                                    res.sendStatus(400).send(error);
                                }
                            );
                    }else{
                        user = null;
                        res.send([]);
                    }
                },
                function(error){
                    res.sendStatus(400).send(error);
                }
            );



    }

    app.get("/api/project/topic/:topicId",findTopicById);

    function findTopicById(req,res){


        var topicId = req.params.topicId;
        model.topicModel.findTopicById(topicId)
            .then(
                function(topics){
                    if(topics){
                        res.json(topics[0]);
                    }else{
                        res.json(null);
                    }
                },
                function(error){
                    res.sendStatus(400).send(error);
                }

            );

    }

    app.put("/api/project/topic/:topicId", updateTopic);

    function updateTopic(req,res){


        var topicId = req.params.topicId;
        var topicUpdate = req.body;
        model.topicModel.updateTopic(topicId,topicUpdate)
            .then(
                function(topic){
                    res.json(topicUpdate);
                },
                function(error){
                    res.sendStatus(400).send(error);
                }
            );
    }

    app.delete("/api/project/topic/:topicId",deleteTopic);

    function deleteTopic(req,res){

        var topicId = req.params.topicId;
        model.gifModel.deleteAllGifsForTopic(topicId)
            .then(
                function(gifs){
                    model.topicModel.deleteTopic(topicId)
                        .then(
                            function(status){
                                res.json(200);
                            },
                            function(error){
                                res.sendStatus(400).send(error);
                            }
                        )
                },
                function(error){
                    res.sendStatus(400).send(error);
                }
            );



    }




};
