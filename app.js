"use strict";

var config = require('./config/master.js')
,		express = require('express')
,		app = express()
,		mongoose = require('mongoose')
,		routes = require('./router.js')(app);


mongoose.connect('mongodb://localhost/mydb');
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback() {
	console.log("Connected to Mongoose");
});

app.use(express.bodyParser());

app.use(express.methodOverride());

app.use(express.static(__dirname + '/public'));

app.use(app.router);

// app.use(routes.url.redirect);

app.use(function(req, res) {
	res.status(404);
	res.render(__dirname + '/views/error.jade', {
		navigationURLs : [{
			direction : 'right',
			url : '//rob.pw',
			title : "Rob.pw"
		}],
		error : {
			title : "Page not found.",
			description : "Unfortunately, that page could not be found."
		}
	});
});

app.use(function(req, res) {
	res.status(500);
	res.render(__dirname + '/views/error.jade', {
		navigationURLs : [],
		error : {
			title : '[Fatal] Internal Server Error',
			description : "Sysadmin notification sent"
		}
	});	
});

app.listen(config.http.port, function() {
	console.log("Listening on: " + config.http.port);
});

exports.app = app;