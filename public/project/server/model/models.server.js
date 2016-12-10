module.exports = function(mongoose) {

  // var connectionString = 'mongodb://127.0.0.1:27017/test';

  // var mongoose = require("mongoose");

 //   mongoose.createConnection(connectionString);

    var userModel = require("./user/user.model.server.js")(mongoose);
    var topicModel = require("./topic/topic.model.server.js")(mongoose);
    var gifModel = require("./gif/gif.model.server.js")(mongoose);
    var commentModel = require("./comment/comment.model.server.js")(mongoose);
   // require('./user/user.model.server')(mongoose);

    var model = {
        userModel: userModel ,
        topicModel: topicModel,
        gifModel: gifModel,
        commentModel: commentModel
    }
    return model;


};

