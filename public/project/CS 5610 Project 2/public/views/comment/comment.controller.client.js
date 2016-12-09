(function() {
    angular
        .module("ProjectApp")
        .controller("CommentListController", CommentListController)
        .controller("NewCommentController", NewCommentController)
        .controller("EditCommentController", EditCommentController)

    function CommentListController($routeParams, CommentService, $sce, GifService, $location, UserService) {
        var vm = this;
        vm.gifId = $routeParams["pid"];
        vm.topicId = $routeParams["tid"];
        vm.userId = $routeParams["uid"];
        vm.title = "Comments";
        vm.user = null;
        vm.dateNow =  new Date();

        vm.checkSafeHtml = checkSafeHtml;
        vm.checkSafeYouTubeUrl = checkSafeYouTubeUrl;
        vm.checkSafeImageUrl = checkSafeImageUrl;
        vm.sortItem = sortItem;
        vm.addComment = addComment;
        vm.deleteComment = deleteComment;
        vm.deleteGif = deleteGif;

        function init() {
            UserService.checkadmin()
                .success(
                    function(users){
                        if(users!=='0'){
                            vm.user=users[0];
                        }
                        CommentService.findCommentsByGifId(vm.gifId)
                            .success(
                                function(commentAns) {
                                    vm.comments = commentAns;
                                    GifService.findGifById(vm.gifId)
                                        .success(
                                            function(gif){
                                                vm.gifGif = gif;
                                                CommentService.mapIdToName()
                                                    .success(
                                                        function(ans){
                                                            console.log(ans);
                                                        }
                                                    )
                                            }
                                        )


                                });
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

        function addComment(){
            if(vm.gifGif) {
                var comment = {
                    _gif: vm.gifId,
                    _user: vm.userId
                };
                CommentService.createComment(vm.gifId, comment)
                    .success(
                        function (commentAns) {
                            vm.commentId = commentAns._id;
                            $location.url('/user/' + vm.userId + '/topic/' + vm.topicId + '/gif/' + vm.gifId + '/comment/' + vm.commentId);
                        }
                    );
            }
        }

        function sortItem(start, end) {


            var comment = vm.comments[start];
           // console.log(comment);

            //vm.comments.splice(end, 0,moved );



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

        function checkSafeYouTubeUrl(url) {
            var parts = url.split('/');
            var id = parts[parts.length - 1];
            url = "https://www.youtube.com/embed/"+id;
            //console.log(url);
            return $sce.trustAsResourceUrl(url);
        }

        function checkSafeImageUrl(url){
            return $sce.trustAsResourceUrl(url);
        }
    }
    function NewCommentController($routeParams, CommentService, $location) {
        var vm = this;
        vm.addComment = addComment;

        vm.gifId = $routeParams["pid"];
        vm.topicId = $routeParams["tid"];
        vm.userId = $routeParams["uid"];


        function addComment(comment){
            if(!comment.name){
                vm.alert = "name field is required";
            } else {
                comment._user = vm.userId;
                comment._gif = vm.gifId;
                CommentService.createComment(vm.gifId, comment)
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
        vm.deleteTemp = deleteTemp;

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

        function deleteTemp(){


            CommentService.deleteTemp();
        }

    }

})();