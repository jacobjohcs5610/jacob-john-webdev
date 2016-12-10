(function() {
    "use strict"
    angular
        .module("ProjectApp")
        .controller("DetailsController", DetailsController)


    var player;

    function DetailsController($routeParams,$http,$sce,SearchService,GifService,$location){
        var vm = this;

        vm.checkSafeImageUrl = checkSafeImageUrl;
        vm.addGif = addGif;

        vm.title="Select Gif";
        vm.gifId = $routeParams.gifId;
        vm.userId = $routeParams["uid"];
        vm.topicId = $routeParams["tid"];
        vm.gifData = null;
        vm.imagesKeys = 0;





        function addGif(gif){
            gif._user = vm.userId;
            GifService.createGif(vm.topicId,gif)
                .success(
                    function(gif){
                        $location.url('/user/'+vm.userId+'/topic/'+vm.topicId+'/gif');
                    }
                );
        }


        function checkSafeImageUrl(url){
            return $sce.trustAsResourceUrl(url);
        }

        function init() {

            SearchService.findGifDetails(vm.gifId)
                .success(
                    function(resp){
                        vm.gifData = resp.data;

                        vm.imagesKeys = Object.keys(vm.gifData.images);
    }
                );


        }

        init();


    }



})();