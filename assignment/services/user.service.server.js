module.exports = function(app, model){




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
            /*    for(i=0;i<users.length;i++){
                    if(users[i].username===req.query.username && users[i].password===req.query.password){
                        userAnswer = users[i];
                    }
                }*/
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
                /*var userAnswer = null;
                for(i=0;i<users.length;i++){
                    if(users[i].username===req.query.username){
                        userAnswer = users[i];

                    }
                }
                console.log(userAnswer);*/

               // res.json(userAnswer);

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
             /*   var userId = req.params.userId;
                var user = null;
                for (i = 0; i<users.length; i++){
                    if(users[i]._id===userId){
                        user = users[i];
                    }
                }
                res.json(user);*/
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
                /*var userId = req.params.userId;
                for(i = 0; i<users.length; i++){
                    if(users[i]._id===userId){
                        users[i] = req.body;
                    }
                }
                res.json(req.body);*/
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
               /* var userId = req.params.userId;
                for(i=0;i<users.length;i++){
                    if(users[i]._id===userId){
                        users.splice(i,1);
                    }
                }

                res.send(true);*/
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
