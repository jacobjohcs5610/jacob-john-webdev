module.exports = function (app){



    var pages =
        [
            { _id: "321", name: "Post 1", websiteId: "456" },
            { _id: "432", name: "Post 2", websiteId: "456" },
            { _id: "543", name: "Post 3", websiteId: "456" }
        ];

    app.post("/api/website/:websiteId/page", createPage);

    function createPage(req,res){
        var page = req.body;
        page._id = Math.floor(Math.random() * pages.length * 1.5 + 1) + "";

        var unique = false;
        while (!unique) {
            var match = false;
            for (i = 0; i < pages.length; i++) {
                if (pages[i]._id === page._id) {
                    match = true;
                }
            }
            if (match) {
                page._id = Math.floor(Math.random() * pages.length * 2 + 1) + "";

            } else{
                unique = true;
            }
        }

        pages.push(page);
        res.json(page);
    }

    app.get("/api/website/:websiteId/page",findPageByWebsiteId);

    function findPageByWebsiteId(req, res) {
        var answer = [];
        var websiteId = req.params.websiteId;
        for (i = 0; i < pages.length; i++) {
            if (pages[i].websiteId === websiteId) {
                answer.push(pages[i]);
            }
        }

        res.json(answer);
    }

    app.get("/api/page/:pageId",findPageById);

    function findPageById(req, res){
        var pageId = req.params.pageId;
        var pageAns = null;
        for(i=0;i<pages.length;i++){
            if(pages[i]._id===pageId){
                pageAns = pages[i];
            }
        }

        res.json(pageAns);
    }

    app.put("/api/page/:pageId",updatePage);

    function updatePage(req, res) {
        var pageId = req.params.pageId;
        var pageNew = req.body;

        for (i = 0; i < pages.length; i++) {
            if (pages[i]._id === pageId) {
                pages[i] = pageNew;
            }
        }

        res.json(pageNew);
    }

    app.delete("/api/page/:pageId", deletePage);

    function deletePage(req, res) {
        var pageId = req.params.pageId;
        for (i = 0; i < pages.length; i++) {
            if (pages[i]._id === pageId) {

                pages.splice(i, 1);

            }
        }

        res.send(true);
    }


};