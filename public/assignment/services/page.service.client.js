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
            "createPage"   : createPage,
            "findPageByWebsiteId" : findPageByWebsiteId,
            "findPageById" : findPageById,
            "updatePage" : updatePage,
            "deletePage" : deletePage

        };
        return api;
        function createPage(websiteId, page) {
            page.websiteId = websiteId;
            page._id = pages[pages.length-1]._id + "1";
            pages.push(page);
        }

        function findPageByWebsiteId(websiteId) {
            var answer = [];
            for(i=0;i<pages.length;i++){
                if(pages[i].websiteId===websiteId){
                    answer.push(pages[i]);
                }
            }
            return answer;
        }

        function findPageById(pageId) {
            for(i=0;i<pages.length;i++){
                if(pages[i]._id===pageId){
                    return pages[i];
                }
            }
            return null;
        }

        function updatePage(pageId, page){
            for(i=0;i<pages.length;i++){
                if(pages[i]._id===pageId){
                    pages[i]=page;
                }
            }
        }


        function deletePage(pageId) {
            for(i=0;i<pages.length;i++){
                if(pages[i]._id===pageId){
                    pages.splice(i,1);
                }
            }
        }




    }
})();