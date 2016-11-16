module.exports = function(app/*,mongoose*/) {
    /*var UserModel = require("./model/user/user.model.server.js")(mongoose);*/

    var connectionString = 'mongodb://127.0.0.1:27017/test';

    var mongoose = require("mongoose");
    mongoose.Promise = global.Promise;
    mongoose.connect(connectionString);

    var model = require("./model/models.server.js")(mongoose);
    require("./services/user.service.server.js")(app,model);

    require("./services/website.service.server.js")(app);
    require("./services/page.service.server.js")(app);
    require("./services/widget.service.server.js")(app);
};
