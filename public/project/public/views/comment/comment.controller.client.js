(function() {
    angular
        .module("ProjectApp")
        .controller("CommentListController", CommentListController)
        .controller("NewCommentController", NewCommentController)
        .controller("EditCommentController", EditCommentController)

    function CommentListController($routeParams, CommentService, $sce, GifService, $location, ProjectUserService) {
        var vm = this;
        vm.gifId = $routeParams["pid"];
        vm.topicId = $routeParams["tid"];
        vm.userId = $routeParams["uid"];
        vm.title = "Comments";
        vm.user = null;
        vm.dateNow =  new Date();

        vm.checkSafeHtml = checkSafeHtml;
        vm.checkSafeImageUrl = checkSafeImageUrl;
        vm.sortItem = sortItem;
        vm.deleteComment = deleteComment;
        vm.deleteGif = deleteGif;

        function init() {
            ProjectUserService.checkadmin()
                .success(
                    function(users){
                        if(users!=='0'){
                            vm.user=users[0];
                        }
                        GifService.findGifById(vm.gifId)
                            .success(
                                function(gif){
                                    vm.gifGif = gif;
                                    CommentService.findCommentsWithUsernameByGifId(vm.gifId)
                                        .success(
                                            function(ans){
                                                vm.comments = ans;
                                            }
                                        )
                                }
                            );

                    }
                );

        }
        init();

        function deleteGif(){
            var gifId = vm.gifGif._id;
            GifService.deleteGif(gifId)
                .success(
                    function(ans){
                        CommentService.deleteAllCommentsForGif(gifId)
                            .success(
                                function(ans){
                                    $location.url('/user/'+vm.userId+'/topic/'+vm.topicId+'/gif');
                                }
                            )
                    }
                );
        }

        function deleteComment(commentId){
            CommentService.deleteComment(commentId)
                .success(
                    function(ans){
                        init();
                    }
                );
        }


        function sortItem(start, end) {
            var comment = vm.comments[start];

            CommentService.sortComments(comment,vm.gifId,start,end)
                .success(function(comment){
                    CommentService.findCommentsByGifId(vm.gifId)
                        .success(function(commentList){
                            vm.comments = commentList;
                        });

                });


        }

        function checkSafeHtml(html) {
            return $sce.trustAsHtml(html);
        }



        function checkSafeImageUrl(url){
            return $sce.trustAsResourceUrl(url);
        }
    }
    function NewCommentController($routeParams, CommentService, $location) {
        var vm = this;
        vm.addComment = addComment;

        vm.title="New Comment";
        vm.gifId = $routeParams["pid"];
        vm.topicId = $routeParams["tid"];
        vm.userId = $routeParams["uid"];


        function addComment(){
            if(!vm.comment || !vm.comment.name){
                vm.alert = "name field is required";
            } else if(!vm.comment.text) {
                vm.alert = "text field is required";
            } else {
                vm.comment._user = vm.userId;
                vm.comment._gif = vm.gifId;
                CommentService.createComment(vm.gifId, vm.comment)
                    .success(function (newComment) {
                        vm.commentId = newComment._id;
                        $location.url('/user/'+vm.userId+'/topic/'+vm.topicId+'/gif/'+vm.gifId+'/comment');
                    });

            }
        }



    }
    function EditCommentController($routeParams, CommentService, $location) {
        var vm = this;
        vm.deleteComment = deleteComment;
        vm.updateComment = updateComment;


        vm.commentId = $routeParams["wgid"];
        vm.gifId = $routeParams["pid"];
        vm.topicId = $routeParams["tid"];
        vm.userId = $routeParams["uid"];
        vm.title = "Update Comment";

        function init() {
            CommentService.findCommentById(vm.commentId)
                .success(function(commentAns){
                    vm.comment = commentAns;
                });
        }
        init();

        function deleteComment(){
            CommentService.deleteComment(vm.commentId);
        }

        function updateComment(){
            if(!vm.comment || !vm.comment.name){
                vm.alert = "comment name is required";
            } else if(!vm.comment.text){
                vm.alert = "text is required";
            } else{
                CommentService.updateComment(vm.commentId, vm.comment)
                    .success(
                        function(commentAns){
                            $location.url("/user/"+vm.userId+"/topic/"+vm.topicId+"/gif/"+vm.gifId+"/comment");
                        }
                    );

            }
        }


    }

})();