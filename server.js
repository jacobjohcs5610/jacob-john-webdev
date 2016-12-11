var express = require('express');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var cookieParser = require('cookie-parser');
var session      = require('express-session');

app.use(cookieParser());
app.use(session({ secret: process.env.USERNAME }));

//console.log(process.env);


// configure a public directory to host static content
app.use(express.static(__dirname + '/public'));

//require ("./test/app.js")(app);

var ipaddress = process.env.OPENSHIFT_NODEJS_IP;
var port      = process.env.OPENSHIFT_NODEJS_PORT || 3000;
app.listen(port, ipaddress);

var connectionString = 'mongodb://127.0.0.1:27017/test';

var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect(connectionString);

require("./assignment/app.js")(app,mongoose);
require("./public/project/server/app.js")(app,mongoose);








