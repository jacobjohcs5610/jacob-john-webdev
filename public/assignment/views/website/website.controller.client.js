(function() {
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", WebsiteListController)
        .controller("NewWebsiteController", NewWebsiteController)
        .controller("EditWebsiteController", EditWebsiteController)

    function WebsiteListController($routeParams,WebsiteService) {
        var vm = this();
        vm.userId = $routeParams("userId");
        function init() {
            vm.websites = WebsiteService.findWebsitesByUser(userId);
        }
        init();
    }
    function NewWebsiteController() {
        var vm = this();
    }
    function EditWebsiteController($routeParams,WebsiteService) {
        var vm = this();
        vm.wid = $routeParams["wid"];
        function init(){
            vm.website = WebsiteService.findWebsiteById(vm.wid);
        }
    }

})();