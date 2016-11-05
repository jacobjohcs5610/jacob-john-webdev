module.exports = function (app){

    var widgets =
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
        ];

    var tempImages = [];

    var multer = require('multer'); // npm install multer --save
    var upload = multer({ dest: __dirname+'/../../public/uploads' });

    app.delete("/api/upload",deleteTemp);

    function deleteTemp(req,res){
        tempImages = [];
        res.send(true);
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


        var temp = {_id: widgetId, widgetType: "image", pageId: pageId, width: width, url: "\\uploads\\" + filename};

        tempImages.push(temp);

        res.redirect('../assignment/index.html#/user/'+userId+'/website/'+webId+'/page/'+pageId+'/widget/'+widgetId);

    }


    app.post("/api/page/:pageId/widget", createWidget);

    function createWidget(req, res){
        var widget = req.body;
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
        res.json(widget);


    }

    app.get("/api/page/:pageId/widget", findWidgetsByPageId);

    function findWidgetsByPageId(req, res) {
        var answer = [];
        var pageId = req.params.pageId;
        for (i = 0; i < widgets.length; i++) {
            if (widgets[i].pageId === pageId) {
                answer.push(widgets[i]);
            }
        }
        res.json(answer);
    }

    app.get("/api/widget/:widgetId", findWidgetById);

    function findWidgetById(req, res) {
        var widgetId = req.params.widgetId;
        var widgetAns = null;
        for (i = 0; i < widgets.length; i++) {
            if (widgets[i]._id === widgetId) {
                widgetAns = widgets[i];
            }
        }
        res.json(widgetAns);
    }

    app.put("/api/widget/:widgetId", updateWidget);

    function updateWidget(req, res) {
        var widgetId = req.params.widgetId;
        var widgetUpdate = req.body;
        for (i = 0; i < widgets.length; i++) {
            if (widgets[i]._id === widgetId) {
                if(tempImages.length==0) {
                    widgets[i] = widgetUpdate;
                }else{
                    widgets[i] = tempImages[0];
                    tempImages = [];
                }
            }
        }


        res.json(widgetUpdate);
    }


    app.delete("/api/widget/:widgetId",deleteWidget);

    function deleteWidget(req, res) {
        var widgetId = req.params.widgetId;
        for (i = 0; i < widgets.length; i++) {
            if (widgets[i]._id === widgetId) {
                widgets.splice(i, 1);
            }
        }

        res.send(true);
    }

    app.put("/page/:pageId/widget",sortWidgets);

    function sortWidgets(req, res){
        var start = req.query.initial;
        var end = req.query.final;
        widgets = req.body;

        res.json(widgets);
    }
}
