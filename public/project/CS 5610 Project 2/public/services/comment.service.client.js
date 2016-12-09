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
            "mapIdToName" : mapIdToName

        };
        return api;

        function mapIdToName(){
            return $http.get("/api/map/");
        }

        function deleteAllCommentsForGif(gifId){
            return $http.delete("/api/allComments/"+gifId);
        }

        function  createComment(gifId, comment){

            comment._gif = gifId;

            return $http.post("/api/gif/"+gifId+"/comment", comment);
        }

        function findCommentsByGifId(gifId) {

            return $http.get("/api/gif/"+gifId+"/comment");
        }

        function findCommentById(commentId) {

            return $http.get("/api/comment/"+commentId);
        }

        function updateComment(commentId, comment){

            return $http.put("/api/comment/"+commentId, comment);
        }


        function deleteComment(commentId) {

            return $http.delete("/api/comment/"+commentId);
        }



        function sortComments(comment,gifId,index1,index2){
            return $http.put("/gif/"+gifId+"/comment?initial="+index1+"&final="+index2,comment)
        }


    }
})();