(function() {
    angular
        .module("ProjectApp")
        .factory("SearchService", SearchService);
    function SearchService($http) {

        var api = {
            "searchGif"   : searchGif,
            "findGifDetails" : findGifDetails,



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

        function stream(){
            var url = "https://stream.twitter.com/1.1/statuses/firehose.json";
            return $http.get(url/*,
                {
                    headers: {'Authorization':
                    'OAuth oauth_consumer_key="6jcyNw8Ppjo6JhMpTf6p5PmWX", oauth_nonce="kYjzVBB8Y0ZFabxSWbWovY3uYSQ2pTgmZeNu2VS4cg", oauth_token="804617494023372800-eHp3ZAx7dRI0y8kCZZqRkDAcUsvb22X", oauth_version="1.0"'
                    }
                }*/);
        }

        function searchiTunes(query){
            var url = "https://itunes.apple.com/search?term="+query;
            return $http.get(url);
        }


    }
})();