(function() {
    angular
        .module("WebAppMaker")
        .factory("WidgetService", WidgetService);
    function WidgetService() {
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
            ]
        var api = {
            "createWidget(pageId, widget)"   : "createWidget(pageId, widget)",
            "findWidgetsByPageId(pageId)" : "findWidgetsByPageId(pageId)",
            "findWidgetById(widgetId) " : "findWidgetById(widgetId) ",
            "updateWidget(widgetId, widget)" : "updateWidget(widgetId, widget)",
            "deleteWidget(widgetId)" : "deleteWidget(widgetId)"

        };
        return api;
        function  createWidget(pageId, widget){
            widgets.append(widget);
            widgets[widgets.length-1].pageId = pageId;
        }

        function findWidgetsByPageId(pageId) {
            answer = {};
            for(i=0;i<widgets.length;i++){
                if(widgets[i].pageId==pageId){
                    answer.append(widgets[i]);
                }
            }
            return answer;
        }

        function findWidgetById(widgetId) {
            for(i=0;i<widgets.length;i++){
                if(widgets[i]._id==widgetId){
                    return widgets[i];
                }
            }
        }

        function updateWidget(widgetId, widget){
            for(i=0;i<widgets.length;i++){
                if(widgets[i]._id==widgetId){
                    widgets[i]=widget;
                }
            }
        }


        function deleteWidget(widgetId) {
            for(i=0;i<widgets.length;i++){
                if(widgets[i]._id==widgetId){
                    widgets.splice(i,0);
                }
            }
        }




    }
})();