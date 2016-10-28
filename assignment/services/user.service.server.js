module.exports = function(app){

    
       // function UserServerService() {

            var users = [
                {_id: "123", username: "alice", password: "alice", firstName: "Alice", lastName: "Wonder"},
                {_id: "234", username: "bob", password: "bob", firstName: "Bob", lastName: "Marley"},
                {_id: "345", username: "charly", password: "charly", firstName: "Charly", lastName: "Garcia"},
                {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose", lastName: "Annunzi"}
            ];


            app.post("/api/user", createUser);

            function createUser (req, res) {
                var user = req.body;
                user._id = Math.floor(Math.random() * users.length * 1.5 + 1) + "";
                
                var unique = false;
                while (!unique) {
                    var match = false;
                    for (i = 0; i < users.length; i++) {
                        if (users[i]._id === user._id) {
                            match = true;
                        }
                    }
                    if (match) {
                        user._id = Math.floor(Math.random() * users.length * 2 + 1) + "";

                    } else{
                        unique = true;
                    }
                }

                users.push(user);
                res.json(user);


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
                for(i=0;i<users.length;i++){
                    if(users[i].username===req.query.username && users[i].password===req.query.password){
                        userAnswer = users[i];
                    }
                }
                res.json(userAnswer);
            }

            function findUserByUsername(req,res){
                var userAnswer = null;
                for(i=0;i<users.length;i++){
                    if(users[i].username===req.query.username){
                        userAnswer = users[i];

                    }
                }
                console.log(userAnswer);

                res.json(userAnswer);
            }

            app.get("/api/user/:userId", findUserById);

            function findUserById(req, res){
                var userId = req.params.userId;
                var user = null;
                for (i = 0; i<users.length; i++){
                    if(users[i]._id===userId){
                        user = users[i];
                    }
                }
                res.json(user);
            }

            app.put("/api/user/:userId", updateUser );

            function updateUser(req, res){
                var userId = req.params.userId;
                for(i = 0; i<users.length; i++){
                    if(users[i]._id===userId){
                        users[i] = req.body;
                    }
                }
                res.json(req.body);
            }

            app.delete("/api/user/:userId", deleteUser);

            function deleteUser(req, res){
                var userId = req.params.userId;
                for(i=0;i<users.length;i++){
                    if(users[i]._id===userId){
                        users.splice(i,1);
                    }
                }

                res.send(true);
            }

   //     }
    
};
