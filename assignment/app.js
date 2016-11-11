module.exports = function(app/*,mongoose*/) {
    /*var UserModel = require("./model/user/user.model.server.js")(mongoose);*/
    require("./services/user.service.server.js")(app/*,UserModel*/);

    require("./services/website.service.server.js")(app);
    require("./services/page.service.server.js")(app);
    require("./services/widget.service.server.js")(app);
};