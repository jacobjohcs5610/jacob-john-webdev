module.exports = function(app, model, passport, LocalStrategy, modelAssignment){

    var bcrypt = require("bcrypt-nodejs");

    //var passport = require('passport');
    //var LocalStrategy = require('passport-local').Strategy;

    //app.use(passport.initialize());
    //app.use(passport.session());

    passport.serializeUser(serializeUser);
    function serializeUser(user, done) {
        done(null, user);
    }

    passport.deserializeUser(deserializeUser);

    function deserializeUser(user, done) {
        console.log(user);
        console.log(done);
        if(user.admin===undefined){
            modelAssignment.userModel
                .findUserById(user._id)
                .then(
                    function (user) {
                        done(null, user);
                    },
                    function (err) {
                        done(err, null);
                    }
                );
        } else {
            model.projectuserModel
                .findUserById(user._id)
                .then(
                    function (user) {
                        done(null, user);
                    },
                    function (err) {
                        done(err, null);
                    }
                );
        }
    }

    passport.use('project',new LocalStrategy(projectStrategy));
    function projectStrategy(username, password, done) {

        modelAssignment.userModel
            .findUserByCredentials(username, password)
            .then(
                function(users) {
                    var user = users[0];

                    if (user.username === username && bcrypt.compareSync(password, user.password)) {

                        return done(null, user);
                    }
                }
                ,
                function(err) {
                    if (err) { return done(err); }
                }
            );
        model.projectuserModel
            .findUserByCredentials(username, password)
            .then(
                function(users) {
                    var user = users[0];

                    if(user.username === username && bcrypt.compareSync(password, user.password)) {

                        return done(null, user);
                    } else {

                        return done(null, false);
                    }
                },
                function(err) {
                    if (err) { return done(err); }
                }
            );
    }

    app.post("/api/project/login", passport.authenticate('project'), login);

    function login(req, res) {

        var user = req.user;
        res.json(user);
    }

    app.post("/api/project/logout", logout);
    function logout(req, res) {
        req.logOut();
        res.send(200);
    }

    app.get ('/api/project/loggedin', loggedin);
    function loggedin(req, res) {
        res.send(req.isAuthenticated() ? req.user : '0');
    }

    app.get('/api/project/checkadmin',checkadmin);
    function checkadmin(req, res){
        res.send(req.user);
    }

    app.post ("/api/project/register", register);
    function register (req, res) {
        var user = req.body;
        user.password = bcrypt.hashSync(user.password);

        model.projectuserModel
            .createUser(user)
            .then(
                function(user){
                    if(user){
                        req.login(user,
                            function(err) {
                                if(err) {
                                    res.status(400).send(err);
                                } else {
                                    res.json(user);
                                }
                            });
                    }
                }
            );
    }

            app.post("/api/project/user", createUser);

            function createUser (req, res) {
                var user = req.body;

                model.projectuserModel.createUser(req.body)
                    .then(
                        function(newUser){
                            res.send(newUser);
                        },
                        function (error){
                            res.sendStatus(400).send(error);
                        }
                    );



            }

            app.get("/api/project/user",findUserByInput);

            function findUserByInput(req,res){
                if(req.query.password && req.query.username){
                    findUserByCredentials(req,res);
                }else if(req.query.username){
                    findUserByUsername(req,res);
                }
            }

            function findUserByCredentials(req,res){
                var userAnswer = null;

                var username = req.query.username;
                var password = req.query.password;
                model.projectuserModel.findUserByCredentials(username,password)
                    .then(
                        function(users){
                            var ans = users[0];
                            if(ans){
                                res.json(ans);
                            }else{
                                res.json(null);
                            }

                        },
                        function(error){
                            res.sendStatus(400).send(error);
                        }

                    );

            }

            function findUserByUsername(req,res){


                var username = req.query.username;
                model.projectuserModel.findUserByUsername(username)
                    .then(
                        function(users){
                            var ans = users[0];
                            if(ans){
                                res.json(ans);
                            }else{
                                res.json(null);
                            }

                        },
                        function(error){
                            res.sendStatus(400).send(error);
                        }
                    );
            }

            app.get("/api/project/user/:userId", findUserById);

            function findUserById(req, res){

                var userId = req.params.userId;
                model.projectuserModel.findUserById(userId)
                    .then(
                        function(users){
                            if(users[0]) {
                                res.json(users[0]);
                            }else{
                                res.json(null);
                            }
                        },
                        function(error){
                            res.sendStatus(400).send(error);
                        }
                    );
            }

            app.put("/api/project/user/:userId", updateUser );

            function updateUser(req, res){

                var userId = req.params.userId;
                var userUpdate = req.body;
                model.projectuserModel.updateUser(userId, userUpdate)
                    .then(
                        function(user){
                            res.json(userUpdate);
                        },
                        function(error){
                            res.sendStatus(400).send(error);
                        }
                    );
            }

            app.delete("/api/project/user/:userId", deleteUser);

            function deleteUser(req, res){

               var userId = req.params.userId;
               model.projectuserModel.deleteUser(userId)
                   .then(
                       function(status){
                           res.send(200);
                       },
                       function(error){
                           res.sendStatus(400).send(error);
                       }
                   );

            }

   //     }
    
};
