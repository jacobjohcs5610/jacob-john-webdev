(function() {
    angular
        .module("ProjectApp")
        .controller("GifListController", GifListController)
        //.controller("NewGifController", NewGifController)
        //s.controller("EditGifController", EditGifController)

    function GifListController($routeParams,GifService,TopicService,$sce,UserService) {
        var vm = this;
        vm.topicId = $routeParams["tid"];
        vm.userId = $routeParams["uid"];
        vm.title = "Gifs";
        vm.topic = null;
        vm.user = null;

        vm.checkSafeImageUrl = checkSafeImageUrl;
        vm.deleteGif = deleteGif;

        function checkSafeImageUrl(url){
            return $sce.trustAsResourceUrl(url);
        }

        function deleteGif(index){
            GifService.deleteGif(vm.gifs[index]._id);
            init();
        }

        function init() {
            UserService.checkadmin()
                .success(
                    function(users){
                        vm.user=users[0];

                    }
                );
            GifService.findGifByTopicId(vm.topicId)
                .success(function(gifList){
                    vm.gifs=gifList;

                });

            TopicService.findTopicById(vm.topicId)
                .success(
                    function(topic){
                        vm.topic = topic;
                        vm.title = vm.topic.name + " Gifs";
                });
        }
        init();
    }


})();
