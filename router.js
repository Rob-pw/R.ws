"use strict";

module.exports = function(app) {
	var routes = {
		url : require('./controllers/url.js')
	};

	app.get('/urls(/:shortUrl)?', routes.url.list);

	app.put('/urls', routes.url.new);

	app.del('/urls', routes.url.delete);

	app.get('/:url', routes.url.redirect);
};