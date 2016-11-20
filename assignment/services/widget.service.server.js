module.exports = function (app,model){

   /* var widgets =
        [
            { _id: "123", widgetType: "HEADER", pageId: "321", size: 2, text: "GIZMODO"},
            { _id: "234", widgetType: "HEADER", pageId: "321", size: 4, text: "Lorem ipsum"},
            { _id: "345", widgetType: "IMAGE", pageId: "321", width: "100%",
                url: "http://lorempixel.com/400/200/"},
            { _id: "456", widgetType: "HTML", pageId: "321", text: "<p>Lorem ipsum</p>"},
            { _id: "567", widgetType: "HEADER", pageId: "321", size: 4, text: "Lorem ipsum"},
            { _id: "678", widgetType: "YOUTUBE", pageId: "321", width: "100%",
                url: "https://youtu.be/AM2Ivdi9c4E" },
            { _id: "789", widgetType: "HTML", pageId: "321", text: "<p>Lorem ipsum</p>"}
        ];*/

    var tempImages = [];


    var multer = require('multer'); // npm install multer --save
    var upload = multer({ dest: __dirname+'/../../public/uploads' });

    app.delete("/api/upload",deleteTemp);

    function deleteTemp(req,res){
        if(tempImages.length>0){
            //tempImages[0].url = "";
            //tempImages[0].name="";
            //tempImages[0].text = "";
            model.widgetModel.updateImageUrl(tempImages[0],"")
                .then(
                    function(widget){
                        tempImages=[];
                        res.json(widget);
                    },
                    function(error){
                        tempImages=[];
                        res.sendStatus(400).send(error);
                    }
                );
        }
        //tempImages = [];
        //res.send(true);
    }


    app.post ("/api/upload", upload.single('myFile'), uploadImage);


    function uploadImage(req, res) {


        var widgetId      = req.body.widgetId;
        var width         = req.body.width;
        var pageId        = req.body.pageId;
        var webId         = req.body.webId;
        var userId        = req.body.userId;
        var myFile        = req.file;


        var originalname  = myFile.originalname; // file name on user's computer
        var filename      = myFile.filename;     // new file name in upload folder
        var path          = myFile.path;         // full path of uploaded file
        var destination   = myFile.destination;  // folder where file is saved to
        var size          = myFile.size;
        var mimetype      = myFile.mimetype;


        /*model.pageModel.findPageById(pageId)
            .then(
                function(pages){
                    if(pages){
                        var temp = {_id: widgetId, type: "image", _page: pages[0], width: width, url: "\\uploads\\" + filename};
                        console.log(temp);
                        tempImages.push(temp);
                        model.widgetModel.updateWidget(temp)
                            .then(
                                function(widget){
                                    console.log(widget);
                                    res.redirect('../assignment/index.html#/user/'+userId+'/website/'+webId+'/page/'+pageId+'/widget/'+widgetId);
                                },
                                function(error){
                                    res.sendStatus(400).send(error);
                                }
                            );

                    } else{

                    }

                    res.redirect('../assignment/index.html#/user/'+userId+'/website/'+webId+'/page/'+pageId+'/widget/'+widgetId);

                },
                function(error){
                    res.sendStatus(400).send(error);
                }
            );*/

        model.widgetModel.updateImageUrl(widgetId, "\\uploads\\" + filename)
            .then(
                function(widget){
                    tempImages.push(widgetId);
                    res.redirect('../assignment/index.html#/user/'+userId+'/website/'+webId+'/page/'+pageId+'/widget/'+widgetId);
                },
                function(error){
                    res.sendStatus(400).send(error);
                }
            );




    }


    app.post("/api/page/:pageId/widget", createWidget);

    function createWidget(req, res){
        /*var widget = req.body;
        widget._id = Math.floor(Math.random() * widgets.length * 1.5 + 1) + "";

        var unique = false;
        while (!unique) {
            var match = false;
            for (i = 0; i < widgets.length; i++) {
                if (widgets[i]._id === widget._id) {
                    match = true;
                }
            }
            if (match) {
                widget._id = Math.floor(Math.random() * widgets.length * 2 + 1) + "";

            } else{
                unique = true;
            }
        }

        widgets.push(widget);
        res.json(widget);*/
        var widget = req.body;
        widget._page = null;

        model.pageModel.findPageById(widget.pageId)
            .then(
                function(pages){
                    if(pages){

                        widget._page = pages[0];
                        var pageId = pages[0]._id;

                        //model.widgetModel.getCount();

                        //console.log(widget.order);
                        model.widgetModel.createWidget(widget)
                            .then(
                                function (widget) {
                                    //console.log(widget);
                                    //model.pageModel.addWidgetToPage(pageId, widget)
                                    //    .then(
                                    //        function(widgetAns){
                                    //            res.json(widget);
                                    //        },
                                    //        function(error){
                                    //            res.sendStatus(400).send(error);
                                    //        }
                                    //    );
                                    //console.log("created "+ widget);
                                    res.json(widget);

                                },
                                function (error) {
                                    console.log(error);
                                    res.sendStatus(400).send(error);
                                }
                            );



                    }else{
                        console.log("null pages");
                        widget._page = null;

                    }
                },
                function(error){
                    console.log(error);
                    res.sendStatus(400).send(error);
                }
            );


    }

    app.get("/api/page/:pageId/widget", findWidgetsByPageId);

    function findWidgetsByPageId(req, res) {
        /*var answer = [];
        var pageId = req.params.pageId;
        for (i = 0; i < widgets.length; i++) {
            if (widgets[i].pageId === pageId) {
                answer.push(widgets[i]);
            }
        }
        res.json(answer);*/
        var pageId = req.params.pageId;
        model.pageModel.findPageById(pageId)
            .then(
                function(pages){
                    if(pages){
                       // console.log(pages[0].widgets);
                        /*var widgetList = [];
                        for(id in pages[0].widgets){
                            model.widgetModel.findWidgetById(pages[0].widgets[id])
                                .then(
                                    function(widget){
                                        widgetList.push(widget);
                                    },
                                    function(error){
                                        res.sendStatus(400).send(error);
                                    }
                                );
                        }
                        //res.send(widgetList);
                        //res.send(pages[0].widgets);*/

                        model.widgetModel.findAllWidgetsForPage(pages[0])
                            .then(
                                function(widgets){
                                    if(widgets){
                                       // console.log(widgets);
                                        res.send(widgets);
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

    app.get("/api/widget/:widgetId", findWidgetById);

    function findWidgetById(req, res) {
        /*var widgetId = req.params.widgetId;
        var widgetAns = null;
        for (i = 0; i < widgets.length; i++) {
            if (widgets[i]._id === widgetId) {
                widgetAns = widgets[i];
            }
        }
        res.json(widgetAns);*/
        var widgetId = req.params.widgetId;

        model.widgetModel.findWidgetById(widgetId)
            .then(
                function(widgets){

                    res.json(widgets[0]);
                },
                function(error){
                    res.sendStatus(400).send(error);
                }
            );
    }

    app.put("/api/widget/:widgetId", updateWidget);

    function updateWidget(req, res) {
        /*var widgetId = req.params.widgetId;
        var widgetUpdate = req.body;
        for (i = 0; i < widgets.length; i++) {
            if (widgets[i]._id === widgetId) {
                if(tempImages.length==0) {
                    widgets[i] = widgetUpdate;
                }else{
                    widgets[i] = tempImages[0];
                    tempImages = [];
                }
            }*/
            var widgetId = req.params.widgetId;
            var widgetUpdate = req.body;
            if(tempImages.length==0) {
                widgetUpdate = req.body;
            }else{
                //widgetUpdate = tempImages[0];
                tempImages = [];
            }
            model.widgetModel.updateWidget(widgetId, widgetUpdate)
                .then(
                    function(widget){
                        res.json(widgetUpdate);
                    },
                    function(error){
                        res.sendStatus(400).send(error);
                    }
                );
        //}


        //res.json(widgetUpdate);
    }


    app.delete("/api/widget/:widgetId",deleteWidget);

    function deleteWidget(req, res) {
        /*var widgetId = req.params.widgetId;
        for (i = 0; i < widgets.length; i++) {
            if (widgets[i]._id === widgetId) {
                widgets.splice(i, 1);
            }
        }

        res.send(true);*/
        var widgetId = req.params.widgetId;


        model.widgetModel.deleteWidget(widgetId)
            .then(
                function(status){
                    res.sendStatus(200);
                },
                function(error){
                    res.sendStatus(400).send(error);
                }
            );


    }

    app.put("/page/:pageId/widget",sortWidgets);

    function sortWidgets(req, res){
        var start = req.query.initial;
        var end = req.query.final;
        var widget = req.body;

        model.widgetModel.sortWidgets(widget,start,end)
            .then(
                function(widget){
                    res.send(widget);
                },
                function(error){
                    res.sendStatus(400).send(error);
                }
            );

        //res.json(widgets);
    }
}
