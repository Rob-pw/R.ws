exports.home = function(req, res) {
	res.send('Home');
};

exports.url = require('../controllers/url.js');