var express = require('express');
var request = require('request');
var key = require('../secrets.js');
var $ = require('jquery');

var app = express();

// allow CORS access to indeed domain
// from https://blog.javascripting.com/2015/01/17/dont-hassle-with-cors/
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

var baseUrl = 'https://api.mlab.com/api/1';

app.get('/', function(req, res) {

    console.log(url);
    req.pipe(request(url)).pipe(res);

});

// TODO add endpoints here

// GET request to return 5 exercises
app.get('/exercises', function (req, res) {

    var url = baseUrl + '/databases/fitness/collections/exercises?l=5&apiKey=' + key;

    request.get(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var info = JSON.parse(body);
            res.send(info);
        } else {
            res.status(400).send(error);
        }
    });
});

// GET request to return all exercises
app.get('/all', function (req, res) {

    var url = baseUrl + '/databases/fitness/collections/exercises?apiKey=' + key;

    request.get(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var info = JSON.parse(body);
            res.send(info);
        } else {
            res.status(400).send(error);
        }
    });
});

// app.post('/exercises', function(req, res, next) {
    //
    // var url = baseUrl + '/databases/fitness/collections/exercises?apiKey=' + key;
    // request.post(url).form({
    //     // req.alias: req.body
    // });
// });

app.listen(process.env.PORT || 5000);
