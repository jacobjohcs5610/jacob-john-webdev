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
            vm.pages = PageService.findPageByWebsiteId(vm.webId);
        }
        init();
    }
    function NewPageController($routeParams, PageService) {
        var vm = this;
        vm.addPage = addPage;

        vm.webId = $routeParams["wid"];
        vm.userId = $routeParams["uid"];

        function init() {

            vm.pages = PageService.findPageByWebsiteId(vm.webId);

        }
        init();

        function addPage(page){
            PageService.createPage(vm.webId,page);
        }


    }
    function EditPageController($routeParams,PageService) {
        var vm = this;
        vm.deletePage = deletePage;
        vm.updatePage = updatePage;

        vm.webId = $routeParams["wid"];
        vm.userId = $routeParams["uid"];

        vm.pageId = $routeParams["pid"];
        function init() {

            vm.pages = PageService.findPageByWebsiteId(vm.webId);
            vm.page = PageService.findPageById(vm.pageId);
        }
        init();

        function deletePage(){
            PageService.deletePage(vm.pageId);
        }

        function updatePage(page){
            PageService.updatePage(vm.pageId,page);
        }
    }

})();
