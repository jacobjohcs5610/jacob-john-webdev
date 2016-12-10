(function(){
    angular
        .module("ProjectApp")
        .config(Configure);

    function Configure($routeProvider) {
        $routeProvider
            .when("/",{
                templateUrl: "views/home.view.client.html",
                controller: "HomeController",
                controllerAs: "model"
            })

            .when("/login", {
                templateUrl: "views/user/login.view.client.html",
                controller: "LoginController",
                controllerAs: "model"
            })
            .when("/register", {
                templateUrl: "views/user/register.view.client.html",
                controller: "RegisterController",
                controllerAs: "model"
            })
            .when("/user/:uid",{
                templateUrl: "views/user/profile.view.client.html",
                controller: "ProfileController",
                controllerAs: "model",
                resolve: { checkLoggedin: checkLoggedin }
            })
            .when("/user/:uid/topic", {
                templateUrl: "views/topic/topic-list.view.client.html",
                controller: "TopicListController",
                controllerAs: "model",
                resolve: { checkLoggedin: checkLoggedin }
            })
            .when("/user/:uid/topic/new", {
                templateUrl: "views/topic/topic-new.view.client.html",
                controller: "NewTopicController",
                controllerAs: "model",
                resolve: { checkLoggedin: checkLoggedin }
            })
            .when("/user/:uid/topic/:tid",{
                templateUrl: "views/topic/topic-edit.view.client.html",
                controller: "EditTopicController",
                controllerAs: "model",
                resolve: { checkLoggedin: checkLoggedin }
            })
            .when("/user/:uid/topic/:tid/gif",{
                templateUrl: "views/gif/gif-list.view.client.html",
                controller: "GifListController",
                controllerAs: "model",
                resolve: { checkLoggedin: checkLoggedin }
            })

            .when("/user/:uid/topic/:tid/gif/search", {
                templateUrl: "views/gif/search.view.client.html",
                controller: "SearchController",
                controllerAs: "model",
                resolve: { checkLoggedin: checkLoggedin }
            })
            .when("/user/:uid/topic/:tid/gif/details/:gifId", {
                templateUrl: "views/gif/details.view.client.html",
                controller: "DetailsController",
                controllerAs: "model",
                resolve: { checkLoggedin: checkLoggedin }
            })
            .when("/user/:uid/topic/:tid/gif/:pid/comment", {
                templateUrl: "views/comment/comment-list.view.client.html",
                controller: "CommentListController",
                controllerAs: "model",
                resolve: { checkLoggedin: checkLoggedin }
            })
            .when("/user/:uid/topic/:tid/gif/:pid/comment/new", {
                templateUrl: "views/comment/comment-new.view.client.html",
                controller: "NewCommentController",
                controllerAs: "model",
                resolve: { checkLoggedin: checkLoggedin }
            })
            .when("/user/:uid/topic/:tid/gif/:pid/comment/:wgid",{
                templateUrl: "views/comment/comment-edit.view.client.html",
                controller: "EditCommentController",
                controllerAs: "model",
                resolve: { checkLoggedin: checkLoggedin }
            })
            .otherwise({
                redirectTo: "/"
            });
        function checkLoggedin($q,$http,$location,$route,TopicService,CommentService) {

            var deferred = $q.defer();
            $http.get('/api/project/loggedin').success(function(users) {
                if (users !== '0') {

                    if(users[0].admin){
                        deferred.resolve();
                    }else {
                        var userId = $route.current.params.uid;
                        var commentId = $route.current.params.wgid;
                        var topicId = $route.current.params.tid;
                        if(commentId && $location.path().split("/").length===9) {
                            CommentService.findCommentById(commentId)
                                .success(
                                    function (comment) {
                                        if (comment._user === users[0]._id && userId === users[0]._id) {
                                            deferred.resolve();
                                        } else {
                                            deferred.reject();
                                        }
                                    }
                                );
                        } else if(topicId && $location.path().split("/").length===5){
                            TopicService.findTopicById(topicId)
                                .success(
                                    function(topic){
                                        if(topic._user===users[0]._id && userId===users[0]._id){
                                            deferred.resolve();
                                        } else {
                                            deferred.reject();
                                        }
                                    }
                                )
                        } else{
                            if(userId===users[0]._id){
                                deferred.resolve();
                            } else{
                                deferred.reject();
                            }
                        }

                    }
                    //deferred.resolve();
                } else {
                    deferred.reject();
                    $location.url('/login');
                }
            });
            return deferred.promise;
        };
/*
        function checkAccessTopic($q,$http,$location,$route,TopicService){
            var deferred = $q.defer();
            $http.get('/api/project/loggedin').success(function(users) {
                if (users !== '0') {
                    if(users[0].admin){
                        deferred.resolve();
                    } else{
                        var topicId = $route.current.params.tid;
                        TopicService.findTopicById(topicId)
                            .success(
                                function(topic){

                                    if(topic._user===users[0]._id){
                                        deferred.resolve();
                                    }else{
                                        deferred.reject();
                                    }
                                }
                            )


                    }
                } else {
                    deferred.reject();
                    $location.url('/login');
                }
            });
            return deferred.promise;
        }

        function checkAccessComment($q,$http,$location,$route,CommentService){
            var deferred = $q.defer();
            $http.get('/api/project/loggedin').success(function(users) {
            if (users !== '0') {
                if(users[0].admin){
                    deferred.resolve();
                } else{
                    var commentId = $route.current.params.wgid;
                    CommentService.findCommentById(commentId)
                        .success(
                            function(comment){

                                if(comment._user===users[0]._id){
                                    deferred.resolve();
                                }else{
                                    deferred.reject();
                                    }
                                }
                            )


                    }
                } else {
                    deferred.reject();
                    $location.url('/login');
                }
            });
            return deferred.promise;
        }*/


    }
})();