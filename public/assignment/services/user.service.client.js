(function() {
    angular
        .module("WebAppMaker")
        .factory("UserService", UserService);
    function UserService() {
        var users = [
            {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
            {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
            {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
            {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
        ];
        var api = {
            "createUser"   : createUser,
            "findUserById" : findUserById,
            "findUserByUsername" : findUserByUsername,
            "findUserByCredentials" : findUserByCredentials,
            "updateUser" : updateUser,
            "deleteUser" : deleteUser
        };
        return api;
        function createUser(user) {
            user._id = users[users.length-1]._id+"1";
            users.push(user);
        }

        function findUserById(id) {
            for(i=0;i<users.length;i++){
                if(users[i]._id===id){
                    return users[i];
                }
            }
            return null;
        }

        function findUserByUsername(username) {
            for(i=0;i<users.length;i++){
                if(users[i].username===username){
                    return users[i];
                }
            }
            return null;
        }

        function findUserByCredentials(username,password){
            for(i=0;i<users.length;i++){
                if(users[i].username===username && users[i].password===password){
                    return users[i];
                }
            }
            return null;
        }


        function updateUser(userId, user) {
            for(i=0;i<users.length;i++){
                if(users[i]._id===userId){
                    users[i]=user;
                }
            }
        }

        function deleteUser(userId){
            for(i=0;i<users.length;i++){
                if(users[i]._id===userId){
                    users.splice(i,0);
                }
            }
        }


    }
})();