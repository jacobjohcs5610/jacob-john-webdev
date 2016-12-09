module.exports = function(app, model){

    var bcrypt = require("bcrypt-nodejs");

    var passport = require('passport');
    var LocalStrategy = require('passport-local').Strategy;

    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser(serializeUser);
    function serializeUser(user, done) {
        done(null, user);
    }

    passport.deserializeUser(deserializeUser);

    function deserializeUser(user, done) {
        model.userModel
            .findUserById(user._id)
            .then(
                function(user){
                    done(null, user);
                },
                function(err){
                    done(err, null);
                }
            );
    }

    passport.use(new LocalStrategy(localStrategy));
    function localStrategy(username, password, done) {

        model.userModel
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

    app.post("/api/login", passport.authenticate('local'), login);

    function login(req, res) {

        var user = req.user;
        res.json(user);
    }

    app.post("/api/logout", logout);
    function logout(req, res) {
        req.logOut();
        res.send(200);
    }

    app.get ('/api/loggedin', loggedin);
    function loggedin(req, res) {
        res.send(req.isAuthenticated() ? req.user : '0');
    }

    app.get('/api/checkadmin',checkadmin);
    function checkadmin(req, res){
        res.send(req.user);
    }

    app.post ("/api/register", register);
    function register (req, res) {
        var user = req.body;
        user.password = bcrypt.hashSync(user.password);

        model.userModel
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

            app.post("/api/user", createUser);

            function createUser (req, res) {
                var user = req.body;
                console.log("in service server");
                model.userModel.createUser(req.body)
                    .then(
                        function(newUser){
                            res.send(newUser);
                        },
                        function (error){
                            res.sendStatus(400).send(error);
                        }
                    );



            }

            app.get("/api/user",findUserByInput);

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
                model.userModel.findUserByCredentials(username,password)
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
                model.userModel.findUserByUsername(username)
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

            app.get("/api/user/:userId", findUserById);

            function findUserById(req, res){

                var userId = req.params.userId;
                model.userModel.findUserById(userId)
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

            app.put("/api/user/:userId", updateUser );

            function updateUser(req, res){

                var userId = req.params.userId;
                var userUpdate = req.body;
                model.userModel.updateUser(userId, userUpdate)
                    .then(
                        function(user){
                            res.json(userUpdate);
                        },
                        function(error){
                            res.sendStatus(400).send(error);
                        }
                    );
            }

            app.delete("/api/user/:userId", deleteUser);

            function deleteUser(req, res){

               var userId = req.params.userId;
               model.userModel.deleteUser(userId)
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
