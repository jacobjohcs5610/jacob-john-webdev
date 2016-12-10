(function() {
    "use strict"
    angular
        .module("ProjectApp")
        .controller("HomeController", HomeController)


    function HomeController($http,$sce,SearchService,$routeParams){
        var vm = this;
        vm.title = "Gif Board";
        vm.findTrend = findTrend;
        vm.checkSafeImageUrl = checkSafeImageUrl;


        function findTrend() {

            SearchService
                .findTrend()
                .success(
                    function(resp){

                        vm.gifs = resp.data;

                    }
                );
        }
        findTrend();

        function checkSafeImageUrl(url){

            return $sce.trustAsResourceUrl(url);
        }



    }
})();