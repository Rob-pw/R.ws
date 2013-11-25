var URLManager = require('./lib/URLs.js')()
,	express = require('./lib/express')
,	app = express()
,	path = require('./lib/node_modules/path')
,	mongo = require('./lib/node_modules/mongoose');

for(var i = 0; i < 5000; i += 1) {
	URLManager.add('http://google.com', 'foo');
	URLManager.add("https://rob.pw", "a b");
}

mongo.connect('mongodb://localhost/mydb');
var db = mongo.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback() {
	

		

});

app.use(app.router);
// app.use(express.static('pub'));

app.get('/(index.html)?', function(req, res) {
	//res.render("/pub/index.html");
	res.send("foo");
});

app.get('/settings', function(req, res) {
	res.send('settings');
});

app.get('/*', function(req, res) {
	var urlParts = req.params[0].split('/')/*req.url.substring(1).split('/')*/
	,	url = URLManager.get(urlParts[0])
	,	key = urlParts[1]
	,	longURL;

	if(url) {
		console.info("U: " + url.shortURL + (key ? ", K: " + key : ''));
		longURL = url.getURL(key);
		if(longURL) {
			console.info("LongURL : " + longURL);
			url.visit();
			res.redirect(301, longURL);
		} else {
			res.redirect(403, '403.html');
		}
	} else {
		res.redirect(404, '404.html');
	}
});

app.use(function(req, res) {
	res.send('404: Nope not found', 404);
});

app.use(function(req, res) {
	res.send('500: Internal error, bad stuff broski.', 500);
});

app.listen(8080, function() {
	console.log("Listening on: 8080.");
});