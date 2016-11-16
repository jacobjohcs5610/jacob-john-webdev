module.exports = function(mongoose) {

  // var connectionString = 'mongodb://127.0.0.1:27017/test';

  // var mongoose = require("mongoose");

 //   mongoose.createConnection(connectionString);

    var userModel = require("./user/user.model.server.js")(mongoose);
   // require('./user/user.schema.server')(mongoose);
   // require('./user/user.model.server')(mongoose);

    var model = {
        userModel: userModel
    }
    return model;


};

