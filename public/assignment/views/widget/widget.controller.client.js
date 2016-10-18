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
            }
        }
        init();
    }
    function NewWidgetController() {

    }
    function EditWidgetController($routeParams, WidgetService) {
        var vm = this;
        vm.widgetId = $routeParams["wgid"];
        vm.pageId = $routeParams["pid"];
        vm.webId = $routeParams["wid"];
        vm.userId = $routeParams["uid"];
        function init() {
            vm.widget = WidgetService.findWidgetById(vm.widgetId);
        }
        init();


    }

})();