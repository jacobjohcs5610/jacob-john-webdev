module.exports = function (app,model){





    app.post("/api/website/:websiteId/page", createPage);

    function createPage(req,res){

        var page = req.body;
        var websiteId = page.websiteId;
        model.websiteModel.findWebsiteById(websiteId)
            .then(
                function(websites){
                    if(websites){
                        page._website = websites[0];
                        model.pageModel.createPage(websiteId, page)
                            .then(
                                function(page){
                                    res.json(page);
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

    app.get("/api/website/:websiteId/page",findPageByWebsiteId);

    function findPageByWebsiteId(req, res) {


        var websiteId = req.params.websiteId;
        model.websiteModel.findWebsiteById(websiteId)
            .then(

                function(websites){
                    if(websites){
                        var website = websites[0];
                        model.pageModel.findAllPagesForWebsite(website)
                            .then(
                                function(pages){
                                    if(pages){
                                        res.send(pages);
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

    app.get("/api/page/:pageId",findPageById);

    function findPageById(req, res){


       var pageId = req.params.pageId;
        model.pageModel.findPageById(pageId)
            .then(
                function(pages){
                    res.json(pages[0]);
                },
                function(error){
                    res.sendStatus(400).send(error);
                }
            );
    }

    app.put("/api/page/:pageId",updatePage);

    function updatePage(req, res) {

        var pageId = req.params.pageId;
        var pageUpdate = req.body;
        model.pageModel.updatePage(pageId,pageUpdate)
            .then(
                function(page){
                    res.json(pageUpdate);
                },
                function(error){
                    res.sendStatus(400).send(error);
                }
            );
    }

    app.delete("/api/page/:pageId", deletePage);

    function deletePage(req, res) {

        var pageId = req.params.pageId;
        model.pageModel.deletePage(pageId)
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