module.exports = function(mongoose){

    var WebsiteSchema = require("./website.schema.server")(mongoose);


    var WebsiteModel = mongoose.model("WebsiteModel",WebsiteSchema);


    var api={
        createWebsiteForUser: createWebsiteForUser,
        findAllWebsitesForUser: findAllWebsitesForUser,
        findWebsiteById: findWebsiteById,
        updateWebsite: updateWebsite,
        deleteWebsite: deleteWebsite
    }

    return api;

    function createWebsiteForUser(userId, website){

        return WebsiteModel.create(website);
    }

    function findAllWebsitesForUser(user){

        return WebsiteModel.find({_user: user});
    }



    function findWebsiteById(websiteId){
        return WebsiteModel.find({_id: websiteId});
    }

    function updateWebsite(websiteId, website){
        return WebsiteModel.update({_id: websiteId},
            {
                name: website.name,
                description: website.description
            });
    }

    function deleteWebsite(websiteId){
        return WebsiteModel.remove({_id: websiteId});
    }



};
