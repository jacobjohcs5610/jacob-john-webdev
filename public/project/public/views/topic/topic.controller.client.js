(function() {
    angular
        .module("ProjectApp")
        .controller("TopicListController", TopicListController)
        .controller("NewTopicController", NewTopicController)
        .controller("EditTopicController", EditTopicController)

    function TopicListController($routeParams,ProjectUserService,TopicService) {
        var vm = this;

        vm.title = "Topics";
        vm.userId = $routeParams["uid"];
        vm.user = null;

        function init() {
            ProjectUserService.checkadmin()
                .success(
                    function(users) {
                        if(users!=='0'){
                            vm.user=users[0];
                        }
                        TopicService.findAllTopics()
                            .success(
                                function (topicList) {
                                    vm.topics = topicList
                                }
                            )
                    }
                );
        }
        init();


    }
    function NewTopicController($routeParams, TopicService, $location) {
        var vm = this;
        vm.addTopic = addTopic;

        vm.userId = $routeParams["uid"];
        vm.title = "New Topic";

        function init(){
            TopicService.findTopicsByUser(vm.userId)
                .success(
                    function(topicList){
                        vm.topics=topicList
                    }
                );
        }

        init();

        function addTopic(topic){
            if(!vm.topic || !vm.topic.name){
                vm.alert = "topic name is required";
            } else {
                topic.developerId = vm.userId;
                TopicService.createTopic(vm.userId, topic);
                $location.url("/user/"+vm.userId+"/topic");
            }
        }
    }



    function EditTopicController($routeParams,TopicService, $location) {
        var vm = this;
        vm.deleteTopic = deleteTopic;
        vm.updateTopic = updateTopic;

        vm.title = "Edit Topic";
        vm.topicId = $routeParams["tid"];
        vm.userId = $routeParams["uid"];
        function init(){
            TopicService.findTopicById(vm.topicId)
                .success(
                    function(topicAns){
                        vm.topic = topicAns;
                    }
                );
            TopicService.findTopicsByUser(vm.userId)
                .success(
                    function(topicList){
                        vm.topics=topicList
                    }
                );
        }

        init();

        function deleteTopic(){
            TopicService.deleteTopic(vm.topicId);
        }

        function updateTopic(topic) {
            if(!vm.topic || !vm.topic.name){
                vm.alert="topic name is required"
            } else {
                topic.developerId = vm.userId;
                TopicService.updateTopic(vm.topicId, topic);
                $location.url("/user/"+vm.userId+"/topic");
            }
        }
    }

})();