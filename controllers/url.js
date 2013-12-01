var URL = require('../models/url.js')
,	viewPath = '../views/'
,	base_n = require('../lib/base_n.js')({
		base : 73
	});

(function init() {
	URL.collection.remove(function(){});

	URL.findOne({}, null, { sort: { decimalValue : -1 } }, function(err, url) {
		if(err) {
			console.error(err);
		} else {
			if(url) {
				var lastURL_decimal = url.decimalValue
				,	lastShortURL;

				if(!lastURL_decimal) {
					lastURL_decimal = base_n.toDecimal(url.shortURL);
					url.decimalValue = lastURL_decimal;
				}

				lastShortURL = base_n.convert(lastURL_decimal);

				base_n.setIncrementBase(url.shortURL);

				console.info("Increment start: " + lastShortURL);

			} else {
				console.error("Unable to retrieve last url.");
			}
		}
	});
})();

exports.list = function(req, res) {
	console.log("list");
	if(!req.params.shortURL) {
		URL.find({}, function(err, urls) {
			res.render(viewPath + 'findadd.jade', {title : 'URL Directory', urls : urls});
		});
	}
};

exports.new = function(req, res) {
	var urlSettings = req.body
	,	url;

	urlSettings.shortURL = base_n.inc();
	urlSettings.decimalValue = base_n.toDecimal(urlSettings.shortURL);

	url = new URL(urlSettings);
	if(!url.longURL) {
		base_n.dec();
		return null;
	}

	url.save(function(err, urls) {
		if(err) {
			res.send(err);
		} else {
			res.render(viewPath + 'findadd.jade', {title : 'URL Added', urls : [urls]});
		}
	});
};

exports.redirect = function(req, res) {
	console.log("redirect: " + req.url);

	var shortURL = req.params.url;

	URL.findOne({shortURL : shortURL}, function(err, doc) {
		if(err || !doc) {
			res.send('Unable to find short URL');
		} else {
			if(!doc.locked) {
				res.redirect(301, doc.longURL);
			} else {
				res.send("This short URL is locked.");
			}
		}
	});
};

exports.delete = function(req, res) {
	console.log("delete");
};