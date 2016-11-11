module.exports = function(mongoose){


    var UserSchema = require('user.schema.server.js');
    var UserModel = mongoose.model("UserModel", UserSchema);

    var api = {
        createUser: "createUser"
    };

    return api;



    function createUser(user){
        UserModel.createUser(user)
            .then(
                function(ans){
                    res.json(ans);
                }
                /*function(err){
                    res.status(400).send(err);
                }*/
            );
    }


};
