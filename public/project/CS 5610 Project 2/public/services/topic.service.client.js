(function() {
    angular
        .module("ProjectApp")
        .factory("TopicService", TopicService);
    function TopicService($http) {

        var api = {
            "createTopic"   : createTopic,
            "findTopicsByUser" : findTopicsByUser,
            "findTopicById" : findTopicById,
            "updateTopic" : updateTopic,
            "deleteTopic" : deleteTopic,
            "findAllTopics" : findAllTopics

        };
        return api;

        function findAllTopics(){
            return $http.get("/api/allTopic");
        }

        function createTopic(userId, topic) {

            return $http.post("/api/user/"+userId+"/topic", topic);
        }

        function findTopicsByUser(userId) {

            return $http.get("/api/user/"+userId+"/topic");
        }

        function findTopicById(topicId) {

            return $http.get("/api/topic/"+topicId);
        }

        function updateTopic(topicId, topic){

            return $http.put("/api/topic/"+topicId, topic);
        }


        function deleteTopic(topicId) {

            return $http.delete("/api/topic/"+topicId);
        }




    }
})();