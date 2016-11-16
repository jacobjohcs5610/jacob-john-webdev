var express = require('express');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// configure a public directory to host static content
app.use(express.static(__dirname + '/public'));

//require ("./test/app.js")(app);

var ipaddress = '127.0.0.1';
var port      = 3000;
app.listen(port, ipaddress);

/*
//temp?
var connectionString = 'mongodb://127.0.0.1:27017/test';

var mongoose = require("mongoose");

mongoose.connect(connectionString);

var db_connection = mongoose.connection;

//test if the connected successfully
db_connection.on('connected', function(){
    console.log("connect to db successfully!");
});

db_connection.on('error', function(){
    console.log("connection error!");
});

db_connection.on('disconnected', function(){
    console.log("db disconnected!");
});


require('./user/user.schema.server')(mongoose);
require('./user/user.model.server')(mongoose);
*/


require("./assignment/app.js")(app/*,mongoose*/);

//require("./assignment/model/models.server.js")(app);







