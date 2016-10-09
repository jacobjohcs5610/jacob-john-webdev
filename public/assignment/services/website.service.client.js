(function() {
    angular
        .module("WebAppMaker")
        .factory("WebsiteService", WebsiteService);
    function WebsiteService() {
        var websites =
            [
                { _id: "123", name: "Facebook",    developerId: "456" },
                { _id: "234", name: "Tweeter",     developerId: "456" },
                { _id: "456", name: "Gizmodo",     developerId: "456" },
                { _id: "567", name: "Tic Tac Toe", developerId: "123" },
                { _id: "678", name: "Checkers",    developerId: "123" },
                { _id: "789", name: "Chess",       developerId: "234" }
            ];
        var api = {
            "createWebsite"   : "createWebsite",
            "findWebsitesByUser" : "findWebsitesByUser",
            "findWebsiteById" : "findWebsiteById",
            "updateWebsite" : "updateWebsite",
            "deleteWebsite" : "deleteWebsite"

        };
        return api;
        function createWebsite(userId, website) {
            websites.append({_id: ""+website._id, name: ""+website.name, developerId: ""+userId});
        }

        function findWebsitesByUser(userId) {
            answer = {};
            for(i=0;i<websites.length;i++){
                if(websites[i].developerId==userId){
                    answer.append(websites[i]);
                }
            }
            return answer;
        }

        function findWebsiteById(websiteId) {
            for(i=0;i<websites.length;i++){
                if(websites[i]._id==websiteId){
                    return websites[i];
                }
            }
        }

        function updateWebsite(websiteId, website){
            for(i=0;i<websites.length;i++){
                if(websites[i]._id==websiteId){
                    websites[i]=website;
                }
            }
        }


        function deleteWebsite(websiteId) {
            for(i=0;i<websites.length;i++){
                if(websites[i]._id==websiteId){
                    websites.splice(i,0);
                }
            }
        }




    }
})();