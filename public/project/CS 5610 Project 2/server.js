var express = require('express');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var cookieParser = require('cookie-parser');
var session      = require('express-session');

app.use(cookieParser());
app.use(session({ secret: process.env.USERNAME }));

// configure a public directory to host static content
app.use(express.static(__dirname + '/public'));

//require ("./test/app.js")(app);

var ipaddress = process.env.OPENSHIFT_NODEJS_IP;
var port      = process.env.OPENSHIFT_NODEJS_PORT || 3000;


app.listen(port, ipaddress);


require("./server/app.js")(app/*,mongoose*/);

/*var unirest =  require('unirest');

unirest.get("https://giphy.p.mashape.com/v1/gifs/trending?api_key=dc6zaTOxFJmzC")
    .header("X-Mashape-Key", "cpojtqXUGVmshW8ZXCSa3PNAIRU6p1lZFfUjsnLLjjXJbDjO1h")
    .header("Accept", "application/json")
    .end(function (result) {
        console.log(result.status, result.headers, result.body);
    });*/