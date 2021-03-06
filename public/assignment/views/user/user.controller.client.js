(function() {
    "use strict"
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController)
        .controller("RegisterController", RegisterController)
        .controller("ProfileController", ProfileController)

        function LoginController($location, UserService) {
            var vm = this;
            vm.login = login;

            function login(userIn){

                if(!vm.user || !vm.user.username || !vm.user.password){
                    vm.alert = "Username and password are required";
                }else {
                    UserService.login(userIn).then(
                        function (response) {
                            var user = response.data;
                            $location.url("/user/" + user._id);
                        });
                }
            }
        }

        function RegisterController($location, UserService) {
            var vm = this;
            vm.register = register;

            function register(user) {
                vm.userNew = null;
                if (!vm.user || !vm.user.username || !vm.user.password || !vm.user.verifypassword) {
                    vm.alert = "one or more missing fields"
                } else {
                    UserService.findUserByUsername(user.username).success(function (userAns) {
                        //console.log(userAns);
                        vm.userNew = userAns;
                        //console.log(vm.userNew);

                        if (vm.userNew === null) {
                            if (user.password === user.verifypassword) {
                                user = {
                                    username: user.username,
                                    password: user.password,
                                    firstName: "",
                                    lastName: ""
                                };
                                UserService.register(user).success(function (newUser) {

                                    $location.url("/user/" + newUser._id);


                                });
                            } else {
                                vm.alert = "Passwords do not match"
                            }
                        } else {
                            vm.alert = "User already exists"
                        }

                    });
                }
            }
        }
        function ProfileController($routeParams, $location, UserService) {

            var vm = this;
            vm.updateProfile = updateProfile;
            vm.logout = logout;

            vm.userId = $routeParams["uid"];


            function logout() {
                UserService
                    .logout()
                    .then(
                        function (response) {
                            //$rootScope.currentUser = null;
                            $location.url("/");
                        })
            }

             function init() {

                var promise = UserService.findUserById(vm.userId)
                    .success(
                        function(user){
                            vm.user= user;
                        }
                    );
            }
            init();

            function updateProfile(user){
               /* var userData = null;
                var promise = UserService.findUserById(vm.userId);
                promise.success(function(user2){userData=user2;});
                userData.firstName = user.firstName;
                userData.lastName = user.lastName;*/
                var promise = UserService.updateUser(vm.userId,vm.user);
                promise.success(function(userUpdate){vm.user=userUpdate;});


            }
        }

})();