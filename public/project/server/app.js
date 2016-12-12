module.exports = function(app,mongoose,passport,LocalStrategy,modelAssignment) {
    /*var UserModel = require("./model/user/user.model.server.js")(mongoose);*/

    //var connectionString = 'mongodb://127.0.0.1:27017/project';

    //var mongoose = require("mongoose");
    //mongoose.Promise = global.Promise;
    //mongoose.connect(connectionString);

    var model = require("./model/models.server.js")(mongoose);
    require("./services/user.service.server.js")(app,model,passport,LocalStrategy,modelAssignment);

    require("./services/topic.service.server.js")(app,model);
    require("./services/gif.service.server.js")(app,model);
    require("./services/comment.service.server.js")(app,model);
};
