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
            return $http.get("/api/project/allTopic");
        }

        function createTopic(userId, topic) {

            return $http.post("/api/project/user/"+userId+"/topic", topic);
        }

        function findTopicsByUser(userId) {

            return $http.get("/api/project/user/"+userId+"/topic");
        }

        function findTopicById(topicId) {

            return $http.get("/api/project/topic/"+topicId);
        }

        function updateTopic(topicId, topic){

            return $http.put("/api/project/topic/"+topicId, topic);
        }


        function deleteTopic(topicId) {

            return $http.delete("/api/project/topic/"+topicId);
        }




    }
})();