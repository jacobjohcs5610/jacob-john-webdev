(function() {
    angular
        .module("WebAppMaker")
        .factory("PageService", PageService);
    function PageService() {
        var pages =
            [
                { _id: "321", name: "Post 1", websiteId: "456" },
                { _id: "432", name: "Post 2", websiteId: "456" },
                { _id: "543", name: "Post 3", websiteId: "456" }
            ]
        var api = {
            "createPage"   : "createPage",
            "findPageByWebsiteId" : "findPageByWebsiteId",
            "findPageById " : "findPageById ",
            "updatePage" : "updatePage",
            "deletePage" : "deletePage"

        };
        return api;
        function createPage(websiteId, page) {
            pages.append(page);
            pages[pages.length-1].websiteId = websiteId;
        }

        function findPageByWebsiteId(websiteId) {
            answer = {};
            for(i=0;i<pages.length;i++){
                if(pages[i].websiteId==websiteId){
                    answer.append(pages[i]);
                }
            }
            return answer;
        }

        function findPageById(pageId) {
            for(i=0;i<pages.length;i++){
                if(pages[i]._id==pageId){
                    return pages[i];
                }
            }
        }

        function updatePage(pageId, page){
            for(i=0;i<pages.length;i++){
                if(pages[i]._id==pageId){
                    pages[i]=page;
                }
            }
        }


        function deletePage(pageId) {
            for(i=0;i<pages.length;i++){
                if(pages[i]._id==pageId){
                    pages.splice(i,0);
                }
            }
        }




    }
})();