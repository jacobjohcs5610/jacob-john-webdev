module.exports = function(mongoose){

    //var mongoose = require('mongoose');

    var bcrypt = require("bcrypt-nodejs");

    var UserSchema = require('./user.schema.server.js')(mongoose);


    var UserModel = mongoose.model("UserModel", UserSchema);

    var api = {
        createUser: createUser,
        findUserByCredentials: findUserByCredentials,
        findUserByUsername: findUserByUsername,
        findUserById: findUserById,
        updateUser: updateUser,
        deleteUser: deleteUser
    };

    return api;



    function createUser(user){
        console.log("in model");
        return UserModel.create(user);

    }
    function findUserByCredentials(username,password){

        return UserModel.find({username: username})
            .then(
                function(users){
                    var user = users[0];
                    if(user && bcrypt.compareSync(password, user.password)) {
                        return UserModel.find({username: username});
                    } else {
                        return UserModel.find({username: null});
                    }
                },
                function(error){
                    return error;
                }
            );
    }
    /*function findUserByCredentials(username,password){
        return UserModel.find({username: username, password: password});
    }*/

    function findUserByUsername(username){
        return UserModel.find({username: username});
    }

    function findUserById(userId){
        return UserModel.find({_id: userId});
    }

    function updateUser(userId, user){
        return UserModel.update(
            {_id: userId},
            {
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email
            }
        );
    }

    function deleteUser(userId){
        return UserModel.remove(
            {_id: userId}
        );
    }


};
