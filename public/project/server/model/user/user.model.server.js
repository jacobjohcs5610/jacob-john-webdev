module.exports = function(mongoose){

    //var mongoose = require('mongoose');

    var bcrypt = require("bcrypt-nodejs");

    var ProjectUserSchema = require('./user.schema.server.js')(mongoose);


    var ProjectUserModel = mongoose.model("ProjectUserModel", ProjectUserSchema);

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
        return ProjectUserModel.create(user);

    }
    function findUserByCredentials(username,password){

        return ProjectUserModel.find({username: username})
            .then(
                function(users){
                    var user = users[0];
                    if(user && bcrypt.compareSync(password, user.password)) {
                        return ProjectUserModel.find({username: username});
                    } else {
                        return ProjectUserModel.find({username: null});
                    }
                },
                function(error){
                    return error;
                }
            );
    }
    /*function findUserByCredentials(username,password){
        return ProjectUserModel.find({username: username, password: password});
    }*/

    function findUserByUsername(username){
        return ProjectUserModel.find({username: username});
    }

    function findUserById(userId){
        return ProjectUserModel.find({_id: userId});
    }

    function updateUser(userId, user){
        return ProjectUserModel.update(
            {_id: userId},
            {
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email
            }
        );
    }

    function deleteUser(userId){
        return ProjectUserModel.remove(
            {_id: userId}
        );
    }


};
