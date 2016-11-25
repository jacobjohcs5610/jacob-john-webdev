(function() {
    angular
        .module("WebAppMaker")
        .controller("PageListController", PageListController)
        .controller("NewPageController", NewPageController)
        .controller("EditPageController", EditPageController)

    function PageListController($routeParams,PageService) {
        var vm = this;
        vm.webId = $routeParams["wid"];
        vm.userId = $routeParams["uid"];

        function init() {
            PageService.findPageByWebsiteId(vm.webId)
                .success(function(pageList){
                    vm.pages=pageList;
                });
        }
        init();
    }
    function NewPageController($routeParams, PageService, $location) {
        var vm = this;
        vm.addPage = addPage;

        vm.webId = $routeParams["wid"];
        vm.userId = $routeParams["uid"];

        function init() {

            PageService.findPageByWebsiteId(vm.webId)
                .success(function(pageList){
                    vm.pages = pageList;
                });

        }
        init();

        function addPage(page){
            if(!vm.page || !vm.page.name){
                vm.alert = "page name is required"
            } else {
                PageService.createPage(vm.webId, page);
                $location.url("/user/"+vm.userId+"/website/"+vm.webId+"/page");
            }

        }


    }
    function EditPageController($routeParams,PageService,$location) {
        var vm = this;
        vm.deletePage = deletePage;
        vm.updatePage = updatePage;

        vm.webId = $routeParams["wid"];
        vm.userId = $routeParams["uid"];

        vm.pageId = $routeParams["pid"];
        function init() {

            PageService.findPageByWebsiteId(vm.webId)
                .success(function(pageList){
                    vm.pages = pageList;
                }
            );
            PageService.findPageById(vm.pageId)
                .success(function(pageList){
                    vm.page = pageList;
                }
            );
        }
        init();

        function deletePage(){
            PageService.deletePage(vm.pageId);

        }

        function updatePage(page){
            if(!vm.page || !vm.page.name){
                vm.alert = "page name is required"
            } else {
                PageService.updatePage(vm.pageId, page);
                $location.url("/user/"+vm.userId+"/website/"+vm.webId+"/page");
            }
        }
    }

})();
