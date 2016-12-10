(function() {
    angular
        .module("ProjectApp")
        .factory("SearchService", SearchService);
    function SearchService($http) {

        var api = {
            "searchGif"   : searchGif,
            "findGifDetails" : findGifDetails,
            "findTrend" : findTrend


        };
        return api;
        function searchGif(query,offset) {
            var url = "http://api.giphy.com/v1/gifs/search?q="+query+"&api_key=dc6zaTOxFJmzC&rating=pg-13&fmt=json&offset="+offset;
            return $http.get(url);

        }

        function findGifDetails(gifId){
            var url = "http://api.giphy.com/v1/gifs/"+gifId+"?api_key=dc6zaTOxFJmzC";
            return $http.get(url);
        }

        function findTrend(){
            var url = "http://api.giphy.com/v1/gifs/trending?api_key=dc6zaTOxFJmzC&rating=pg&fmt=json&limit=4";
            return $http.get(url);
        }


    }
})();