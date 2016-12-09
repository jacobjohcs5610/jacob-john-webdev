(function() {
    angular
        .module("ProjectApp")
        .factory("UserService", UserService);
    function UserService($http) {

        var api = {
            "createUser"   : createUser,
            "findUserById" : findUserById,
            "findUserByUsername" : findUserByUsername,
            "findUserByCredentials" : findUserByCredentials,
            "updateUser" : updateUser,
            "deleteUser" : deleteUser,
            "logout" : logout,
            "login" : login,
            "register" : register,
            "checkadmin" : checkadmin

        };
        return api;

        function checkadmin(){
            return $http.get("/api/loggedin");
        }

        function register(user) {
            return $http.post("/api/register", user);
        }

        function logout(user) {
            return $http.post("/api/logout");
        }

        function login(user){
            return $http.post("/api/login",user);
        }



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