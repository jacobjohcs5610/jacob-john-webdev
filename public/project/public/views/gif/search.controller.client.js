(function() {
    "use strict"
    angular
        .module("ProjectApp")
        .controller("SearchController", SearchController)


    function SearchController($sce,SearchService,$routeParams,$location){
        var vm = this;
        vm.title = "Search";
        vm.searchGif = searchGif;
        vm.checkSafeImageUrl = checkSafeImageUrl;
        vm.pageNumber = 0;
        vm.userId = $routeParams["uid"];
        vm.topicId = $routeParams["tid"];
        vm.q = $routeParams.q;
        vm.pg = $routeParams.pg;

        function init(){
            if(vm.q || vm.pg){
                searchGif(vm.q,vm.pg);
            }
        }
        init();

        function searchGif(query,page) {
            page = parseInt(page);
            if(page<0 || page===undefined){
                page=0;
            }
            $location.url('?q='+query+'&pg='+page);
            vm.pageNumber = parseInt(page);
            vm.query = query;
            SearchService
                .searchGif(query,vm.pageNumber*25)
                .success(
                    function(resp){

                        vm.items = resp.data;
                        var items = resp.data;
                    }
                );
        }

        function checkSafeImageUrl(url){

            return $sce.trustAsResourceUrl(url);
        }



    }
})();