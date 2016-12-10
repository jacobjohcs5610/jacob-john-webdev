(function() {
    angular
        .module("ProjectApp")
        .factory("CommentService", CommentService);
    function CommentService($http) {

        var api = {
            "createComment"   : createComment,
            "findCommentsByGifId" : findCommentsByGifId,
            "findCommentById" : findCommentById,
            "updateComment" : updateComment,
            "deleteComment" : deleteComment,
            "deleteAllCommentsForGif" : deleteAllCommentsForGif,
            "sortComments" : sortComments,
            "findCommentsWithUsernameByGifId" : findCommentsWithUsernameByGifId

        };
        return api;

        function findCommentsWithUsernameByGifId(gifId){
            return $http.get("/api/project/map/"+gifId);
        }

        function deleteAllCommentsForGif(gifId){
            return $http.delete("/api/project/allComments/"+gifId);
        }

        function  createComment(gifId, comment){

            comment._gif = gifId;

            return $http.post("/api/project/gif/"+gifId+"/comment", comment);
        }

        function findCommentsByGifId(gifId) {

            return $http.get("/api/project/gif/"+gifId+"/comment");
        }

        function findCommentById(commentId) {

            return $http.get("/api/project/comment/"+commentId);
        }

        function updateComment(commentId, comment){

            return $http.put("/api/project/comment/"+commentId, comment);
        }


        function deleteComment(commentId) {

            return $http.delete("/api/project/comment/"+commentId);
        }



        function sortComments(comment,gifId,index1,index2){
            return $http.put("/gif/project/"+gifId+"/comment?initial="+index1+"&final="+index2,comment)
        }


    }
})();