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

            function login(user){
                user = UserService.findUserByCredentials(user.username,user.password);
                if(user){
                    $location.url("/user/"+user._id);
                }else{
                    vm.alert = "Unable to login" ;
                }
            }
        }

        function RegisterController($location, UserService) {
            var vm = this;
            vm.register = register;

            function register(user) {
                if (UserService.findUserByUsername(user.username) === null) {
                    if (user.password === user.verifypassword) {
                        user = {
                            username: user.username,
                            password: user.password,
                            firstName: "",
                            lastName: ""
                        };
                        UserService.createUser(user);
                        user = UserService.findUserByUsername(user.username);
                        $location.url("/user/"+user._id);
                    } else{
                        vm.alert = "Passwords do not match"
                    }
                } else {
                    vm.alert = "User already exists"
                }
            }
        }
        function ProfileController($routeParams, $location, UserService) {

            var vm = this;
            vm.updateProfile = updateProfile;

            vm.userId = $routeParams["uid"];
            function init() {
                vm.user = UserService.findUserById(vm.userId);
            }
            init();

            function updateProfile(user){
                var userData = UserService.findUserById(vm.userId);
                userData.firstName = user.firstName;
                userData.lastName = user.lastName;
                UserService.updateUser(userData._id,userData);


            }
        }

})();