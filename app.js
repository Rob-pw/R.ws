var express = require('./lib/node_modules/express')
,		app = express()
,		mongoose = require('./lib/node_modules/mongoose')
,		routes = require('./routes/main.js');

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

app.get('/urls(/:shortUrl)?', routes.url.list);

app.put('/urls', routes.url.new);

app.del('/urls', routes.url.delete);

app.get('/(index.html)?', routes.home);

app.get('/:url', routes.url.redirect);

// app.use(routes.url.redirect);

app.use(function(req, res) {
	res.send('404: Nope not found', 404);
});

app.use(function(req, res) {
	res.send('500: Internal error, bad stuff broski.', 500);
});

app.listen(8080, function() {
	console.log("Listening on: 8080.");
});