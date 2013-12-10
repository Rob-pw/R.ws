var mongoose = require('../node_modules/mongoose')
,	Schema = mongoose.Schema
,	ObjectID = Schema.ObjectID

,	isValidURL = function(url) {
		var regxp = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/;
		if(!url) {
			throw new Error("No URL supplied.");
		} else {
			if(url.match(regxp)) {
				return url;
			} else {
				throw new Error("Invalid URL supplied.");
			}
		}
	}

,	VisitSchema = Schema({
	when : {
		type : Date,
		require : true
	},
	ip : String,
	origin : String
})

,	URL = Schema({
	decimalValue : {
		type : Number,
		index : {
			unique : true
		},
		require : true
	},
	longURL : {
		set : isValidURL,
		get : function(url) {
			return this.locked ? false : url;
		},
		type : String,
		require : true
	},
	shortURL : {
		type : String,
		require : true
	},
	key : String,
	locked : {
		type : Boolean,
		require : false,
		default : false
	},
	visits : [VisitSchema]
});

module.exports = mongoose.model('URL', URL);
