(function() {
    angular
        .module("WebAppMaker")
        .factory("UserService", UserService);
    function UserService($http) {
        /*var users = [
            {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
            {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
            {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
            {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
        ];*/
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
            //user._id = users[users.length-1]._id+"1";
            //users.push(user);

            return $http.post("/api/user",user);
        }

        function findUserById(id) {


            return $http.get("/api/user/"+id);

        }

        function findUserByUsername(username) {

            return $http.get("/api/user?username="+username);
        }

        function findUserByCredentials(username,password){

            return $http.get("/api/user?username="+username+"&password="+password);
        }


        function updateUser(userId, user) {


            return $http.put("/api/user/"+userId,user);
        }

        function deleteUser(userId){

            return $http.delete("/api/user/" + userId)
        }


    }
})();