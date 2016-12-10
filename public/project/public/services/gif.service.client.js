(function() {
    angular
        .module("ProjectApp")
        .factory("GifService", GifService);
    function GifService($http) {

        var api = {
            "createGif"   : createGif,
            "findGifByTopicId" : findGifByTopicId,
            "findGifById" : findGifById,
            "updateGif" : updateGif,
            "deleteGif" : deleteGif

        };
        return api;
        function createGif(topicId, gif) {

            gif.topicId = topicId;
            return $http.post("/api/project/topic/"+topicId+"/gif",gif);
        }

        function findGifByTopicId(topicId) {


            return $http.get("/api/project/topic/"+topicId+"/gif");
        }

        function findGifById(gifId) {


            return $http.get("/api/project/gif/"+gifId);
        }

        function updateGif(gifId, gif){


            return $http.put("/api/project/gif/"+gifId,gif);
        }


        function deleteGif(gifId) {


            return $http.delete("/api/project/gif/"+gifId);

        }




    }
})();