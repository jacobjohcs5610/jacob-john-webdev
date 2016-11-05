(function() {
    angular
        .module("WebAppMaker")
        .factory("WidgetService", WidgetService);
    function WidgetService($http) {
        /*var widgets =
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
            ]*/
        var api = {
            "createWidget"   : createWidget,
            "findWidgetsByPageId" : findWidgetsByPageId,
            "findWidgetById" : findWidgetById,
            "updateWidget" : updateWidget,
            "deleteWidget" : deleteWidget,
            "deleteTemp" : deleteTemp,
            "sortWidgets" : sortWidgets

        };
        return api;
        function  createWidget(pageId, widget){

            widget.pageId = pageId;


            return $http.post("/api/page/"+pageId+"/widget", widget);
        }

        function findWidgetsByPageId(pageId) {
            //var answer = [];
            //for(i=0;i<widgets.length;i++){
             //   if(widgets[i].pageId===pageId){
             //       answer.push(widgets[i]);
             //   }
            //}
            //return answer;

            return $http.get("/api/page/"+pageId+"/widget");
        }

        function findWidgetById(widgetId) {
           // for(i=0;i<widgets.length;i++){
           //     if(widgets[i]._id===widgetId){
            //        return widgets[i];
           //     }
           // }
           // return null;

            return $http.get("/api/widget/"+widgetId);
        }

        function updateWidget(widgetId, widget){
         //   for(i=0;i<widgets.length;i++){
         //       if(widgets[i]._id===widgetId){
         //           widgets[i]=widget;
         //       }
         //   }

            return $http.put("/api/widget/"+widgetId, widget);
        }


        function deleteWidget(widgetId) {
           // for(i=0;i<widgets.length;i++){
           //     if(widgets[i]._id===widgetId){
           //         widgets.splice(i,1);
           //     }
           // }

            return $http.delete("/api/widget/"+widgetId);
        }


        function deleteTemp(){
            return $http.delete("/api/upload");
        }

        function sortWidgets(widgets,pageId,index1,index2){
            return $http.put("/page/"+pageId+"/widget?initial="+index1+"&final="+index2,widgets)
        }


    }
})();