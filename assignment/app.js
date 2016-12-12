module.exports = function(app,mongoose,passport,LocalStrategy,modelProject) {
    /*var UserModel = require("./model/user/user.model.server.js")(mongoose);*/





    var model = require("./model/models.server.js")(mongoose);
    require("./services/user.service.server.js")(app,model,passport,LocalStrategy,modelProject);

    require("./services/website.service.server.js")(app,model);
    require("./services/page.service.server.js")(app,model);
    require("./services/widget.service.server.js")(app,model);
};
