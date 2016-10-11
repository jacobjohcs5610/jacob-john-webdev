(function() {
    angular
        .module("WebAppMaker")
        .controller("PageListController", PageListController)
        .controller("NewPageController", NewPageController)
        .controller("EditPageController", EditPageController)

    function PageListController($routeParams,PageService) {
        var vm = this();
        vm.wid = $routeParams("wid");
        function init() {
            vm.pages = PageService.findPageByWebsiteId(wid);
        }
        init();
    }
    function NewPageController() {
        var vm = this();
    }
    function EditPageController($routeParams,PageService) {
        var vm = this();
        vm.pid = $routeParams["pid"];
        function init() {
            vm.page = PageService.findPageById(v.pid);
        }
        init()
    }

})();
