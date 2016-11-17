module.exports = function(mongoose){

    var PageSchema = require("./page.schema.server.js")(mongoose);

    var PageModel = mongoose.model("PageModel",PageSchema);

    var api={
        createPage: createPage,
        findAllPagesForWebsite: findAllPagesForWebsite,
        findPageById: findPageById,
        updatePage: updatePage,
        deletePage: deletePage
    };

    return api;


    function createPage(websiteId, page){
        return PageModel.create(page);
    }

    function findAllPagesForWebsite(website){
        return PageModel.find({_website: website});
    }

    function findPageById(pageId){
        return PageModel.find({_id: pageId});
    }

    function updatePage(pageId, page){
        return PageModel.update(
            {_id: pageId},
            {
                name: page.name,
                title: page.title
            });
    }

    function deletePage(pageId){
        return PageModel.remove({_id: pageId});
    }

};