(function() {
    angular
        .module("WebAppMaker"/*, ["jgaDirectives"]*/)
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
        /*vm.sortItem = sortItem;*/

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
                        if (vm.widgets[w].widgetType == "HEADER" || vm.widgets[w].widgetType == "HEADING") {
                            vm.widgets[w].widgetType = "heading";
                        } else if (vm.widgets[w].widgetType == "IMAGE") {
                            vm.widgets[w].widgetType = "image";
                        } else if (vm.widgets[w].widgetType == "YOUTUBE") {
                            vm.widgets[w].widgetType = "youtube";
                        } else {

                        }
                    }
                });

        }
        init();
        /*
        function sortItem(start, end, WebService) {
            console.log("start: " + start);
            console.log("end: " + end);

            var moved = vm.widgets.splice(start, 1)[0];
            //var moved = vm.items.splice(start, 1);
            //console.log("moved: " + moved.first);

            vm.widgets.splice(end, 0,moved );

            for(var i in vm.items){
                console.log(vm.widgets[i]);
            }


        }*/

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
            var widget = {widgetType: widgetType};
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