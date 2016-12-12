module.exports = function(app,mongoose,passport,LocalStrategy) {
    /*var UserModel = require("./model/user/user.model.server.js")(mongoose);*/





    var model = require("/models.server.js")(mongoose);

    require("./assignment/services/user.service.server.js")(app,model,passport,LocalStrategy);
    require("./assignment/services/website.service.server.js")(app,model);
    require("./assignment/services/page.service.server.js")(app,model);
    require("./assignment/services/widget.service.server.js")(app,model);

    require("./public/project/server/services/user.service.server.js")(app,model,passport,LocalStrategy);
    require("./public/project/server/services/topic.service.server.js")(app,model);
    require("./public/project/server/services/gif.service.server.js")(app,model);
    require("./public/project/server/services/comment.service.server.js")(app,model);

};
