module.exports = function(app,connectionString) {
    /*var UserModel = require("./model/user/user.model.server.js")(mongoose);*/



    var mongoose = require("mongoose");
    mongoose.Promise = global.Promise;
    mongoose.connect(connectionString);

    var model = require("./model/models.server.js")(mongoose);
    require("./services/user.service.server.js")(app,model);

    require("./services/website.service.server.js")(app,model);
    require("./services/page.service.server.js")(app,model);
    require("./services/widget.service.server.js")(app,model);
};
