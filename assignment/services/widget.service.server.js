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
                widgets[i] = widgetUpdate;
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
}
