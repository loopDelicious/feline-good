var express = require('express');
var request = require('request');
var key = require('../secrets.js');

var app = express();

// allow CORS access to indeed domain
// from https://blog.javascripting.com/2015/01/17/dont-hassle-with-cors/
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use('/', function(req, res) {

    var url = 'https://api.mlab.com/api/1/databases?apiKey=' + key;
    console.log(url);
    req.pipe(request(url)).pipe(res);
});

// TODO add endpoints here

app.listen(process.env.PORT || 5000);
