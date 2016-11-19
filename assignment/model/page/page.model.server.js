module.exports = function(mongoose){

    var PageSchema = require("./page.schema.server.js")(mongoose);

    var PageModel = mongoose.model("PageModel",PageSchema);

    var api={
        createPage: createPage,
        findAllPagesForWebsite: findAllPagesForWebsite,
        findPageById: findPageById,
        updatePage: updatePage,
        deletePage: deletePage,
        addWidgetToPage: addWidgetToPage,
        reorderWidgets: reorderWidgets
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

    function addWidgetToPage(pageId, widget){
        console.log(widget._id);
        console.log(pageId);
        return PageModel.update(
            {_id: pageId},
            {$push: {widgets: widget._id}}
        );
    }

    function reorderWidgets(pageId, widget, end){
        var target =PageModel.update(
            {_id: pageId},
            {$pull: {widgets: widget._id}}
        );
        return PageModel.update(
            {_id: pageId},
            {$push: {widgets: {$each:[widget._id], $position: end}}}
        );
    }



};