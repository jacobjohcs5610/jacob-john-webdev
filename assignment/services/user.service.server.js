module.exports = function(app, model, passport, LocalStrategy){


    var bcrypt = require("bcrypt-nodejs");

   // var passport = require('passport');
    //var LocalStrategy = require('passport-local').Strategy;

    var FacebookStrategy = require('passport-facebook').Strategy;

    //app.use(passport.initialize());
    //app.use(passport.session());

    var facebookConfig = {
        clientID     : process.env.FACEBOOK_CLIENT_ID,
        clientSecret : process.env.FACEBOOK_CLIENT_SECRET,
        callbackURL  : process.env.FACEBOOK_CALLBACK_URL
    };

    passport.use(new FacebookStrategy(facebookConfig, facebookStrategy));

    function facebookStrategy(token, refreshToken, profile, done) {
        model.userModel
            .findUserByFacebookId(profile.id)
            .then(
                function(user) {
                    if(user) {
                        return done(null, user);
                    } else {
                        var names = profile.displayName.split(" ");
                        var newFacebookUser = {
                            lastName:  names[1],
                            firstName: names[0],
                            email:     profile.emails ? profile.emails[0].value:"",
                            facebook: {
                                id:    profile.id,
                                token: token
                            }
                        };
                        return model.userModel.createUser(newFacebookUser);
                    }
                },
                function(err) {
                    if (err) { return done(err); }
                }
            )
            .then(
                function(user){
                    return done(null, user);
                },
                function(err){
                    if (err) { return done(err); }
                }
            );
    }

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


    passport.use('assignment',new LocalStrategy(localStrategy));
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

    app.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));
    app.get('/auth/facebook/callback',
        passport.authenticate('facebook'),function(req,res) {
            //successRedirect: '/#/user/:uid',
            //failureRedirect: '/#/login'
            //console.log(req.user);
            var user = req.user;
            if(user){
                req.logIn(user,
                function(err) {
                    if(err){
                        res.sendStatus(400).send(err);
                    }else {

                        res.redirect('/assignment/index.html#/user/' + user._id);
                    }
                });
            }else{
                res.redirect('/assignment/index.html#/login');
            }

        });

    app.get('/api/loggedin', loggedin);


    function loggedin(req, res) {

        res.send(req.isAuthenticated() ? req.user : '0');
    }



    app.post("/api/register", register);


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

    app.post("/api/logout", logout);
    function logout(req, res) {
        req.logOut();
        res.send(200);
    }

    app.post("/api/login", passport.authenticate('assignment'), login);

    function login(req, res) {

        var user = req.user;
        res.json(user);
    }

            app.post("/api/user", createUser);

            function createUser (req, res) {
                var user = req.body;

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
