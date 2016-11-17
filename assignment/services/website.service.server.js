module.exports = function(app,model){



    app.post("/api/user/:userId/website", createWebsite);

    function createWebsite(req, res){

        var website = req.body;

        website._user = null;
        model.userModel.findUserById(website.developerId)
            .then(
                function(users){
                    if(users){
                        website._user = users[0];

                        model.websiteModel.createWebsiteForUser(website.developerId,website)
                            .then(
                                function(website){
                                    res.json(website);
                                },
                                function(error){
                                    res.sendStatus(400).send(error);
                                }
                            );

                    }else{
                        website._user = null;
                    }
                },
                function(error){
                    res.sendStatus(400).send(error);
                }
            );



    }

    app.get("/api/user/:userId/website",findWebsitesByUser);

    function findWebsitesByUser(req,res){

        var userId = req.params.userId;
        var user = null;
        model.userModel.findUserById(userId)
            .then(
                function(users){
                    if(users){
                        user = users[0];
                        model.websiteModel.findAllWebsitesForUser(user)
                            .then(
                                function(websites){
                                    res.send(websites);
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

    app.get("/api/website/:websiteId",findWebsiteById);

    function findWebsiteById(req,res){


        var websiteId = req.params.websiteId;
        model.websiteModel.findWebsiteById(websiteId)
            .then(
                function(websites){
                    if(websites){
                        res.json(websites[0]);
                    }else{
                        res.json(null);
                    }
                },
                function(error){
                    res.sendStatus(400).send(error);
                }

            );

    }

    app.put("/api/website/:websiteId", updateWebsite);

    function updateWebsite(req,res){


        var websiteId = req.params.websiteId;
        var websiteUpdate = req.body;
        model.websiteModel.updateWebsite(websiteId,websiteUpdate)
            .then(
                function(website){
                    res.json(websiteUpdate);
                },
                function(error){
                    res.sendStatus(400).send(error);
                }
            );
    }

    app.delete("/api/website/:websiteId",deleteWebsite);

    function deleteWebsite(req,res){

        var websiteId = req.params.websiteId;
        model.websiteModel.deleteWebsite(websiteId)
            .then(
                function(status){
                    res.json(200);
                },
                function(error){
                    res.sendStatus(400).send(error);
                }
            );

    }




};
