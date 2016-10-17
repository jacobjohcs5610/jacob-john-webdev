(function() {
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", WebsiteListController)
        .controller("NewWebsiteController", NewWebsiteController)
        .controller("EditWebsiteController", EditWebsiteController)

    function WebsiteListController($routeParams,$location,WebsiteService) {
        var vm = this;


        vm.userId = $routeParams["uid"];
        function init() {
            vm.websites = WebsiteService.findWebsitesByUser(vm.userId);
        }
        init();


    }
    function NewWebsiteController($routeParams, WebsiteService) {
        var vm = this;
        vm.addWebsite = addWebsite;

        vm.userId = $routeParams["uid"];

        function init(){
            vm.websites = WebsiteService.findWebsitesByUser(vm.userId);
        }

        init();

        function addWebsite(website){
            WebsiteService.createWebsite(vm.userId,website);
        }
    }



    function EditWebsiteController($routeParams,WebsiteService) {
        var vm = this;
        vm.deleteWebsite = deleteWebsite;
        vm.updateWebsite = updateWebsite;


        vm.webId = $routeParams["wid"];
        vm.userId = $routeParams["uid"];
        function init(){
            vm.website = WebsiteService.findWebsiteById(vm.webId);
            vm.websites = WebsiteService.findWebsitesByUser(vm.userId);
        }

        init();

        function deleteWebsite(){
            WebsiteService.deleteWebsite(vm.webId);
        }

        function updateWebsite(website) {
            WebsiteService.updateWebsite(vm.webId, website);
        }
    }

})();