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
            return $http.post("/api/topic/"+topicId+"/gif",gif);
        }

        function findGifByTopicId(topicId) {


            return $http.get("/api/topic/"+topicId+"/gif");
        }

        function findGifById(gifId) {


            return $http.get("/api/gif/"+gifId);
        }

        function updateGif(gifId, gif){


            return $http.put("/api/gif/"+gifId,gif);
        }


        function deleteGif(gifId) {


            return $http.delete("/api/gif/"+gifId);

        }




    }
})();