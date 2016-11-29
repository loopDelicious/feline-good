var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');
var key = require('../secrets.js');
var bcrypt = require('bcryptjs');

var redis = require('redis');
var session = require('express-session');
var redisStore = require('connect-redis')(session);

var app = express();
var client = redis.createClient();

// allow CORS access
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
    res.header("Content-Type", "application/json");
    next();
});

app.use(session({
    secret: 'ssshhhhh',
    // create new redis store.
    store: new redisStore({
        host: 'localhost',
        port: 6379,
        client: client,
        ttl :  260
    }),
    saveUninitialized: false,
    resave: false
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var baseUrl = 'https://api.mlab.com/api/1';

// ***************** EXERCISES collection **********************

// GET request to return ALL exercises from db
app.get('/all', function (req, res) {

    var url = baseUrl + '/databases/fitness/collections/exercises?apiKey=' + key.mlab;

    request.get(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var info = JSON.parse(body);
            res.send(info);
        } else {
            res.status(400).send(error);
        }
    });
});

// POST request to ADD a new exercise to db
app.post('/add', function(req, res) {

    var data = {
        title: req.body.title.toLowerCase(),
        benefit: req.body.benefit.toLowerCase()
    };

    var url = baseUrl + '/databases/fitness/collections/exercises?apiKey=' + key.mlab;

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

// PUT request to EDIT an exercise in db
app.put('/edit', function(req, res) {

    var data = {
        title: req.body.title,
        benefit: req.body.benefit
    };
    var id = req.body._id;

    var url = baseUrl + '/databases/fitness/collections/exercises' + encodeURIComponent(id) + '?apiKey=' + key.mlab;

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

// DELETE request to DELETE an exercise from db
app.delete('/delete', function(req, res) {

    var id = req.body.id;

    var url = baseUrl + '/databases/fitness/collections/exercises/' + encodeURIComponent(id) + '?apiKey=' + key.mlab;

    request.delete(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            res.json(body);
        }
        else {
            res.status(400).json(error);
        }
    });
});

// ***************** USERS collection **********************

// TODO: send session / cookie with every request
// store sessions in Redis (preferred)
// server creates unique session cookie and returns to client to send with every request
// First time login requires server to generate session cookie and stores it in Redis
// Redis stores session key and admin / user as value
// generate cookie key, then update user when logged in, else anonymous user

// POST to ADD new user to users collection
app.post('/register', function(req, res) {

    var email = req.body.email;

    var hash = bcrypt.hash(req.body.password, 8, function(err, hash) {

        var url = baseUrl + '/databases/fitness/collections/users?apiKey=' + key.mlab;

        var data = {
            email: email,
            hash: hash,
            admin: false
        };

        request.post({
            url: url,
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        }, function (error, response, body) {
            if (!error && response.statusCode == 200) {

                // when user creates account, set the key to redis.
                req.session.key = req.body.email;

                res.json(body);
            }
            else {
                res.status(400).json(error);
            }
        });
    });
});

// POST to verify user in users table
app.post('/login', function(req, res) {

    var email = req.body.email;
    var password = req.body.password;

    var url = baseUrl + '/databases/fitness/collections/users?q={email:"' + encodeURIComponent(email) + '"}&apiKey=' + key.mlab;

    request.get({
        url: url,
        headers: {
            'Content-Type': 'application/json'
        }
    }, function (error, response, body) {

        var user = JSON.parse(body);

        if (user != null) {

            var hash = user[0].hash;

            if (bcrypt.compareSync(password, hash)) {

                // when user logs in, set the key to redis.
                req.session.key = req.body.email;

                res.json(body);
            } else {
                res.status(422);
                res.json('None shall pass');
            }
        }
    });
});

// POST to logout
app.post('/logout', function(req, res) {
    req.session.destroy( (err) => {
        if (err) {
            res.json(err);
        } else {
            res.json('success');
        }
    });
});

// ***************** MISC **********************

// POST to send email
app.post('/email', function(req, res) {
    var email = req.body.email;
    var exercises = req.body.exercises;

    var url = 'https://api.sparkpost.com/api/v1';

    request.post({
        url: url,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': key.sparkpost
        },
        content: {
            "from": "sandbox@sparkpostbox.com",
            "subject": "Feline Good",
            "text": exercises
        },
        recipients: [{ "address": email }]
    }, function (error, response, body) {

        if (!error && response.statusCode == 200) {
            res.send(body);
        }
        else {
            res.status(400).send(body);
        }
    });
});


app.listen(process.env.PORT || 5500);
