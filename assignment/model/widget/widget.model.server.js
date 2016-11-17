module.exports = function(mongoose){

    var WidgetSchema = require("./widget.schema.server.js")(mongoose);

    var WidgetModel = mongoose.model("WidgetModel",WidgetSchema);

    var api={
        createWidget: createWidget,
        findAllWidgetsForPage: findAllWidgetsForPage,
        findWidgetById: findWidgetById,
        updateWidget: updateWidget,
        deleteWidget: deleteWidget
    }

    return api;


    function createWidget(widget){
        return WidgetModel.create(widget);
    }

    function findAllWidgetsForPage(page){
        return WidgetModel.find({_page: page});
    }

    function findWidgetById(widgetId){
        return WidgetModel.find({_id: widgetId});
    }

    function updateWidget(widgetId, widget){
        return WidgetModel.update(
            {_id: widgetId},
            {
                name: widget.name
            }
        );
    }

    function deleteWidget(widgetId){
        return WidgetModel.remove({_id: widgetId});
    }

};