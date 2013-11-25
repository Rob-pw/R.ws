var URL = require('models/url.js');

exports.all = function(req, res) {
	URL.find({}, function(err, docs) {
		console.log(docs);
		res.render('urls/index', {title : 'URL Directory', urls : docs});
	});
};

exports.create = function(req, res) {
	console.log(req.url);

	var urlSettings = {}
	,	url = new URL(urlSettings);

	url.save(function(err, data) {
		if(err) {
			res.send(err);
		} else {
			console.log(data);
			res.render('urls/added', {title : 'URL Added', url : url});
		}
	});
};

exports.visit = function(req, res) {
	var shortURL = req.params[0];

	URL.findOne({shortURL : shortURL}, function(err, doc) {
		if(err) {
			res.send('Short URL not found :(');
		} else {
			res.redirect(301, doc.longURL);
		}
	});
};