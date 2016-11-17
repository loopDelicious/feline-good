var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');
var key = require('../secrets.js');
var $ = require('jquery');

var app = express();

// allow CORS access to indeed domain
// from https://blog.javascripting.com/2015/01/17/dont-hassle-with-cors/
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
    res.header("Content-Type", "application/json");
    next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var baseUrl = 'https://api.mlab.com/api/1';

app.get('/', function(req, res) {

    console.log(url);
    req.pipe(request(url)).pipe(res);

});

// GET request to return 5 exercises from db
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

// GET request to return all exercises from db
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

// ADD a new exercise to db
app.post('/add', function(req, res) {

    var data = {
        alias: req.body.alias,
        body: req.body.body
    };

    var url = baseUrl + '/databases/fitness/collections/exercises?apiKey=' + key;

    request.post({
        url: url,
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    }, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            res.send(body);
        }
        else {
            res.status(400).send(body);
        }
    });
});

// EDIT an exercise in db
app.put('/edit', function(req, res, next) {

    var data = {
        id: req.body._id.$oid,
        alias: req.body.alias,
        body: req.body.body
    };

    var url = baseUrl + '/databases/fitness/collections/exercises?apiKey=' + key;

    request.put({
        url: url,
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    }, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            res.send(body);
        }
        else {
            res.status(400).send(error);
        }
    });
});

// DELETE an exercise from db
app.delete('/delete', function(req, res) {

    var response = JSON.stringify(req.body);
    var id = response.slice(2,-5);

    var url = baseUrl + '/databases/fitness/collections/exercises/' + id + '?apiKey=' + key;

    request.delete(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            res.send(body);
        }
        else {
            res.status(400).send(error);
        }
    });
});



app.listen(process.env.PORT || 5000);
