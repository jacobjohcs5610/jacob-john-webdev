(function() {
    angular
        .module("WebAppMaker")
        .controller("WidgetListController", WidgetListController)
        .controller("NewWidgetController", NewWidgetController)
        .controller("EditWidgetController", EditWidgetController)

    function WidgetListController($routeParams, WidgetService, $sce) {
        var vm = this;
        vm.pageId = $routeParams["pid"];
        vm.webId = $routeParams["wid"];
        vm.userId = $routeParams["uid"];

        vm.checkSafeHtml = checkSafeHtml;
        vm.checkSafeYouTubeUrl = checkSafeYouTubeUrl;
        vm.checkSafeImageUrl = checkSafeImageUrl;
        vm.sortItem = sortItem;

        function init() {
            WidgetService.findWidgetsByPageId(vm.pageId)
                .success(function(widgetAns) {
                    vm.widgets = widgetAns;


                    for (var w in vm.widgets) {
                        /*  if(vm.widgets[w].widgetType==="HTML"){

                         var div = document.createElement("div");
                         div.innerHTML = vm.widgets[w].text;
                         var text = div.textContent || div.innerText || "";
                         vm.widgets[w].text = text;
                         }*/
                        if (vm.widgets[w].type == "HEADER" || vm.widgets[w].type == "HEADING") {
                            vm.widgets[w].type = "heading";
                        } else if (vm.widgets[w].type == "IMAGE") {
                            vm.widgets[w].type = "image";
                        } else if (vm.widgets[w].type == "YOUTUBE") {
                            vm.widgets[w].type = "youtube";
                        } else if(vm.widgets[w].type == "HTML") {
                            vm.widgets[w].type = "html";
                        } else {}
                    }
                });

        }
        init();

        function sortItem(start, end) {


            var widget = vm.widgets[start];
           // console.log(widget);

            //vm.widgets.splice(end, 0,moved );



            WidgetService.sortWidgets(widget,vm.pageId,start,end)
                .success(function(widget){
                    WidgetService.findWidgetsByPageId(vm.pageId)
                        .success(function(widgetList){
                            vm.widgets = widgetList;
                        });

                });


        }

        function checkSafeHtml(html) {
            return $sce.trustAsHtml(html);
        }

        function checkSafeYouTubeUrl(url) {
            var parts = url.split('/');
            var id = parts[parts.length - 1];
            url = "https://www.youtube.com/embed/"+id;
            //console.log(url);
            return $sce.trustAsResourceUrl(url);
        }

        function checkSafeImageUrl(url){
            return $sce.trustAsResourceUrl(url);
        }
    }
    function NewWidgetController($routeParams, WidgetService) {
        var vm = this;
        vm.addWidget = addWidget;

        vm.pageId = $routeParams["pid"];
        vm.webId = $routeParams["wid"];
        vm.userId = $routeParams["uid"];

        function addWidget(widgetType){
            var widget = {type: widgetType};
            WidgetService.createWidget(vm.pageId, widget)
                .success(function(newWidget){
                    vm.widgetId = newWidget._id;
                });
            //vm.widgetId = widget._id;
        }



    }
    function EditWidgetController($routeParams, WidgetService, $location) {
        var vm = this;
        vm.deleteWidget = deleteWidget;
        vm.updateWidget = updateWidget;
        vm.deleteTemp = deleteTemp;

        vm.widgetId = $routeParams["wgid"];
        vm.pageId = $routeParams["pid"];
        vm.webId = $routeParams["wid"];
        vm.userId = $routeParams["uid"];

        function init() {
            WidgetService.findWidgetById(vm.widgetId)
                .success(function(widgetAns){
                    vm.widget = widgetAns;
                });
        }
        init();

        function deleteWidget(){
            WidgetService.deleteWidget(vm.widgetId);
        }

        function updateWidget(){
            WidgetService.updateWidget(vm.widgetId, vm.widget);
        }

        function deleteTemp(){


            WidgetService.deleteTemp();
        }

    }

})();