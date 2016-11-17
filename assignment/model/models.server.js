module.exports = function(mongoose) {

  // var connectionString = 'mongodb://127.0.0.1:27017/test';

  // var mongoose = require("mongoose");

 //   mongoose.createConnection(connectionString);

    var userModel = require("./user/user.model.server.js")(mongoose);
    var websiteModel = require("./website/website.model.server.js")(mongoose);
    var pageModel = require("./page/page.model.server.js")(mongoose);
    var widgetModel = require("./widget/widget.model.server.js")(mongoose);
   // require('./user/user.model.server')(mongoose);

    var model = {
        userModel: userModel ,
        websiteModel: websiteModel,
        pageModel: pageModel,
        widgetModel: widgetModel
    }
    return model;


};

