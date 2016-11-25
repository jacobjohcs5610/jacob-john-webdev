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
            WebsiteService.findWebsitesByUser(vm.userId)
            .success(
                function(websiteList){
                    vm.websites=websiteList
                }
            );
        }
        init();


    }
    function NewWebsiteController($routeParams, WebsiteService, $location) {
        var vm = this;
        vm.addWebsite = addWebsite;

        vm.userId = $routeParams["uid"];

        function init(){
            WebsiteService.findWebsitesByUser(vm.userId)
                .success(
                    function(websiteList){
                        vm.websites=websiteList
                    }
                );
        }

        init();

        function addWebsite(website){
            if(!vm.website || !vm.website.name){
                vm.alert = "website name is required";
            } else {
                website.developerId = vm.userId;
                WebsiteService.createWebsite(vm.userId, website);
                $location.url("/user/"+vm.userId+"/website");
            }
        }
    }



    function EditWebsiteController($routeParams,WebsiteService, $location) {
        var vm = this;
        vm.deleteWebsite = deleteWebsite;
        vm.updateWebsite = updateWebsite;


        vm.webId = $routeParams["wid"];
        vm.userId = $routeParams["uid"];
        function init(){
            WebsiteService.findWebsiteById(vm.webId)
                .success(
                    function(websiteAns){
                        vm.website = websiteAns;
                    }
                );
            WebsiteService.findWebsitesByUser(vm.userId)
                .success(
                    function(websiteList){
                        vm.websites=websiteList
                    }
                );
        }

        init();

        function deleteWebsite(){
            WebsiteService.deleteWebsite(vm.webId);
        }

        function updateWebsite(website) {
            if(!vm.website || !vm.website.name){
                vm.alert="website name is required"
            } else {
                website.developerId = vm.userId;
                WebsiteService.updateWebsite(vm.webId, website);
                $location.url("/user/"+vm.userId+"/website");
            }
        }
    }

})();