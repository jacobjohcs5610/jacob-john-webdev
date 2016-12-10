(function() {
    angular
        .module("ProjectApp")
        .factory("ProjectUserService", ProjectUserService);
    function ProjectUserService($http) {

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
            return $http.get("/api/project/loggedin");
        }

        function register(user) {
            return $http.post("/api/project/register", user);
        }

        function logout(user) {
            return $http.post("/api/project/logout");
        }

        function login(user){
            return $http.post("/api/project/login",user);
        }



        function createUser(user) {
            //user._id = users[users.length-1]._id+"1";
            //users.push(user);

            return $http.post("/api/project/user",user);
        }

        function findUserById(id) {


            return $http.get("/api/project/user/"+id);

        }

        function findUserByUsername(username) {

            return $http.get("/api/project/user?username="+username);
        }

        function findUserByCredentials(username,password){

            return $http.get("/api/project/user?username="+username+"&password="+password);
        }


        function updateUser(userId, user) {


            return $http.put("/api/project/user/"+userId,user);
        }

        function deleteUser(userId){

            return $http.delete("/api/project/user/" + userId)
        }


    }
})();