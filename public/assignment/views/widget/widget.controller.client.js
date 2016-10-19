(function() {
    angular
        .module("WebAppMaker")
        .controller("WidgetListController", WidgetListController)
        .controller("NewWidgetController", NewWidgetController)
        .controller("EditWidgetController", EditWidgetController)

    function WidgetListController($routeParams, WidgetService) {
        var vm = this;
        vm.pageId = $routeParams["pid"];
        vm.webId = $routeParams["wid"];
        vm.userId = $routeParams["uid"];
        function init() {
            vm.widgets = WidgetService.findWidgetsByPageId(vm.pageId);
            for (var w in vm.widgets){
                if(vm.widgets[w].widgetType==="HTML"){

                    var div = document.createElement("div");
                    div.innerHTML = vm.widgets[w].text;
                    var text = div.textContent || div.innerText || "";
                    vm.widgets[w].text = text;
                }
                if(vm.widgets[w].widgetType=="HEADER"){
                    vm.widgets[w].widgetType = "HEADING";
                }
            }
        }
        init();
    }
    function NewWidgetController($routeParams) {
        var vm = this;


        vm.pageId = $routeParams["pid"];
        vm.webId = $routeParams["wid"];
        vm.userId = $routeParams["uid"];


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