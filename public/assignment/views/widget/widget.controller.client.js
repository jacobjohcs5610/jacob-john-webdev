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

        function init() {
            vm.widgets = WidgetService.findWidgetsByPageId(vm.pageId);

            for (var w in vm.widgets){
              /*  if(vm.widgets[w].widgetType==="HTML"){

                    var div = document.createElement("div");
                    div.innerHTML = vm.widgets[w].text;
                    var text = div.textContent || div.innerText || "";
                    vm.widgets[w].text = text;
                }*/
                if(vm.widgets[w].widgetType=="HEADER"){
                    vm.widgets[w].widgetType = "heading";
                } else if(vm.widgets[w].widgetType=="IMAGE"){
                    vm.widgets[w].widgetType = "image";
                } else if(vm.widgets[w].widgetType=="YOUTUBE"){
                    vm.widgets[w].widgetType = "youtube";
                } else{
                    vm.widgets[w].widgetType = "html";
                }
            }

        }
        init();

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
            WidgetService.createWidget(vm.pageId, widget);
            vm.widgetId = widget._id;
        }



    }
    function EditWidgetController($routeParams, WidgetService) {
        var vm = this;
        vm.deleteWidget = deleteWidget;
        vm.updateWidget = updateWidget;

        vm.widgetId = $routeParams["wgid"];
        vm.pageId = $routeParams["pid"];
        vm.webId = $routeParams["wid"];
        vm.userId = $routeParams["uid"];

        function init() {
            vm.widget = WidgetService.findWidgetById(vm.widgetId);
        }
        init();

        function deleteWidget(){
            WidgetService.deleteWidget(vm.widgetId);
        }

        function updateWidget(){
            WidgetService.updateWidget(vm.widgetId, vm.widget);
        }

    }

})();