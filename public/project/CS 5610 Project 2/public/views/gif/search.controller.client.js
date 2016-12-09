(function() {
    "use strict"
    angular
        .module("ProjectApp")
        .controller("SearchController", SearchController)


    function SearchController($http,$sce,SearchService,$routeParams){
        var vm = this;
        vm.title = "Search";
        vm.searchGif = searchGif;
        vm.checkSafeImageUrl = checkSafeImageUrl;
        vm.pageNumber = 0;
        vm.userId = $routeParams["uid"];
        vm.topicId = $routeParams["tid"];


        function stream(query){
            SearchService
                .searchiTunes(query)
                .success(
                    function(res){
                        console.log(res);
                    }
                );
        }

        function searchGif(query,page) {
            if(page<0 || page===undefined){
                page=0;
            }
            vm.pageNumber = page;
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