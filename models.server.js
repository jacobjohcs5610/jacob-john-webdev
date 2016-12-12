module.exports = function(mongoose) {

    // var connectionString = 'mongodb://127.0.0.1:27017/test';

    // var mongoose = require("mongoose");

    //   mongoose.createConnection(connectionString);

    var userModel = require("./assignment/model/user/user.model.server.js")(mongoose);
    var websiteModel = require("./assignment/model/website/website.model.server.js")(mongoose);
    var pageModel = require("./assignment/model/page/page.model.server.js")(mongoose);
    var widgetModel = require("./assignment/model/widget/widget.model.server.js")(mongoose);


    // require('./user/user.model.server')(mongoose);

    var projectuserModel = require("./public/project/server/model/user/user.model.server.js")(mongoose);
    var topicModel = require("./public/project/server/model/topic/topic.model.server.js")(mongoose);
    var gifModel = require("./public/project/server/model/gif/gif.model.server.js")(mongoose);
    var commentModel = require("./public/project/server/model/comment/comment.model.server.js")(mongoose);
    // require('./user/user.model.server')(mongoose);






    var model = {
        userModel: userModel ,
        websiteModel: websiteModel,
        pageModel: pageModel,
        widgetModel: widgetModel,

        projectuserModel: projectuserModel ,
        topicModel: topicModel,
        gifModel: gifModel,
        commentModel: commentModel
    }
    return model;


};