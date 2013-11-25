var mongo = require('mongoose')
,	VisitSchema = mongo.Schema({
		when : Date,
		ip : String,
		origin : String
	})

,	URLSchema = mongo.Schema({
		longURL : String,
		shortURL : String,
		key : String,
		visits : [VisitSchema]
	})

,	URLs = function() {
		var base_n = require('./base_n.js')({
			base : 73
		})
		,	URLs = {}
		,	lastURL = '0';

		function URL(url, shortURL, params) {
			if(!url || !shortURL) {
				return false;
			}

			var secretKey
			,	realURL = url
			,	locked = false
			,	creationDate = new Date();


			if(params.key) {
				secretKey = params.key;
			}

			this.shortURL = shortURL;
			this.visits = [];
			this.getURL = function(key) {
				if(!this.locked && (!secretKey || secretKey === key)) {
					return realURL;
				} else {
					return false;
				}
			};

			this.export = function() {
				return {
					longURL : url,
					shortURL : shortURL,
					key : secretKey,
					visits : visits
				}
			};

			this.save = function() {

			};
		}

		URL.prototype.unlock = function() {
			this.locked = false;
		};

		URL.prototype.lock = function() {
			this.locked = true;
		};

		URL.prototype.visit = function(params) {
			var now = new Date();

			params = params || {};

			params.when = now;
			this.visits[now.toString()] = params;
		};

		function addURL(longURL, key) {
			var newURL = base_n.inc(lastURL)
			,	url = new URL(longURL, newURL, {
				key : key
			});	

			lastURL = newURL;

			return (URLs[newURL] = url);
		}

		function fetchURL(shortURL) {
			return URLs[shortURL];
		}

		return {
			add : addURL,
			get : fetchURL
		}
	};

module.exports = URLs;
