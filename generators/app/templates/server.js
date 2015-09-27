var settings = require('./package.json').appSettings;
var env = process.env.NODE_ENV || 'development';

var express = require('express');
var app = express();

//json request parser
var bodyParser = require('body-parser');
app.use(bodyParser.json());

//enable cors requests
var cors = require('cors');
app.use(cors());

//1) init db connection and orm (bookshelf)
require('./db/bookshelf');

//2) init app routes
require('./app/router/init')(app);

//3) init airbrake to capture all exceptions
/*
to use this functionality, uncomment and add 'airbrake' key to env settings
var airbrake = require('airbrake').createClient(settings.airbrake);
airbrake.handleExceptions();
*/

//4) capture all data to stderr
process.stderr.on('data', function (data) {
  console.log(data);
});

//5) start web server on port from settings
var server = app.listen(settings[env].port, function () {
  console.log('<%= projectName %> listening at http://127.0.0.1:%s', server.address().port);
});

