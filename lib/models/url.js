var mongoose = require('mongoose')
,	Schema = mongoose.Schema
,	ObjectID = Schema.ObjectID

,	VisitSchema = new Schema({
		when : {
			type : Date,
			require : true
		},
		ip : String,
		origin : String
	})

,	URL = new Schema({
		longURL : {
			type : String,
			require : true
		},
		shortURL : {
			type : String,
			require : true
		},
		key : String,
		visits : [VisitSchema]
	});

module.exports = mongoose.model('URL', URL);