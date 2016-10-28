module.exports = function(app){

    var websites =
        [
            { _id: "123", name: "Facebook",    developerId: "456" },
            { _id: "234", name: "Tweeter",     developerId: "456" },
            { _id: "456", name: "Gizmodo",     developerId: "456" },
            { _id: "567", name: "Tic Tac Toe", developerId: "123" },
            { _id: "678", name: "Checkers",    developerId: "123" },
            { _id: "789", name: "Chess",       developerId: "234" }
        ];

    app.post("/api/user/:userId/website", createWebsite);

    function createWebsite(req, res){
        var website = req.body;
        //console.log(website);
        website._id = Math.floor(Math.random() * websites.length * 1.5 + 1) + "";

        var unique = false;
        while (!unique) {
            var match = false;
            for (i = 0; i < websites.length; i++) {
                if (websites[i]._id === website._id) {
                    match = true;
                }
            }
            if (match) {
                website._id = Math.floor(Math.random() * websites.length * 2 + 1) + "";
            } else{
                unique = true;
            }
        }

        websites.push(website);
        res.json(website);
    }

    app.get("/api/user/:userId/website",findWebsitesByUser);

    function findWebsitesByUser(req,res){
        answer = [];
        var userId = req.params.userId;
        for(i=0;i<websites.length;i++){
            if(websites[i].developerId===userId){
                answer.push(websites[i]);
            }
        }
        res.json(answer);
    }

    app.get("/api/website/:websiteId",findWebsiteById);

    function findWebsiteById(req,res){
        var websiteId = req.params.websiteId;
        var websiteAns = null;
        for(i=0;i<websites.length;i++){
            if(websites[i]._id===websiteId){
                websiteAns = websites[i];
            }
        }

        res.json(websiteAns);

    }

    app.put("/api/website/:websiteId", updateWebsite);

    function updateWebsite(req,res){
        var websiteId = req.params.websiteId;
        var websiteNew = req.body;
        for(i=0;i<websites.length;i++){
            if(websites[i]._id===websiteId){
                websites[i]=websiteNew;
            }
        }
        res.json(websiteNew);
    }

    app.delete("/api/website/:websiteId",deleteWebsite);

    function deleteWebsite(req,res){
        var websiteId = req.params.websiteId;
        for(i=0;i<websites.length;i++){
            if(websites[i]._id===websiteId){
                websites.splice(i,1);
            }
        }
        res.send(true);

    }




};
