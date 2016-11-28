module.exports = function(mongoose){

    var WidgetSchema = require("./widget.schema.server.js")(mongoose);

    var WidgetModel = mongoose.model("WidgetModel",WidgetSchema);

    var api={
        createWidget: createWidget,
        findAllWidgetsForPage: findAllWidgetsForPage,
        findWidgetById: findWidgetById,
        updateWidget: updateWidget,
        deleteWidget: deleteWidget,
        updateImageUrl: updateImageUrl,
        sortWidgets: sortWidgets

    }

    return api;




    function createWidget(widget){
        //widget.order = WidgetModel.count()+1;
        //console.log("widgetorder "+ widget.order)
        console.log("model createWidget 1");
        return WidgetModel.count({_page: widget._page})
            .then(
                function(count){
                    console.log(count);
                    console.log("model createWidget 2");
                    widget.order = count;
                    console.log(widget);
                    return WidgetModel.create(widget);
                },
                function(error){
                    console.log(error);
                    return error;
                }
            );
        //return WidgetModel.create(widget);
    }

    function findAllWidgetsForPage(page){
        return WidgetModel.find({_page: page}).sort({order: 1});
    }

    function findWidgetById(widgetId){
        return WidgetModel.find({_id: widgetId});
    }

    function updateWidget(widgetId, widget){
        return WidgetModel.update(
            {_id: widgetId},

                widget

        );
    }

    function deleteWidget(widgetId){

       /* WidgetModel.count()
            .then(
                function(count){
                    //widgetId._id = null
                    //widgetId.order = count+1;
                    console.log(count);
                    return WidgetModel.create({type: "heading", order: count+1});
                },
                function(error){
                    return error;
                }
            );*/
       //var index = 0;

       return WidgetModel.find({_id: widgetId})
           .then(
               function(widgets){
                   var index = widgets[0].order;
                   //console.log(index);
                   return WidgetModel.update({$and:[{order: {$gt: index}},{_page: widgets[0]._page}]},{$inc: {order: -1}}, {multi: true})
                       .then(
                           function(status){
                               return WidgetModel.remove({_id: widgetId});
                           },
                           function(error){
                               return error;
                            }
                       );
               },
               function(error){
                   return error;
               }
           );
          /* .then(
               function(widgets){
                   index = widgets[0].order;
                   return WidgetModel.updateMany({order: {$gt: index}},{$inc: {order: -1}});
               },
               function(error){

               }
           );*/



    }

    function updateImageUrl(widgetId,url){
        return WidgetModel.update(
            {_id: widgetId},
            {url: url}
        );
    }


    function sortWidgets(widget, start, end){
        //console.log(widget);
        return WidgetModel.update({$and:[{_page: widget.page},{order: {$gt: widget.order}}]},{$inc: {order: -1}},{multi:true})
            .then(
                function(widgets){
                    return WidgetModel.update({$and:[{_page: widget.page},{order: {$gt: end-1}}]},{$inc: {order: 1}},{multi:true})
                        .then(
                            function(widgets){
                                return WidgetModel.update({_id: widget._id},{order: end});

                            },
                            function(error){
                                return error;
                            }
                        );
                },
                function(error){
                    return error;
                }
            );
    }

};