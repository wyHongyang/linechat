var mongoose = require('mongoose'),
	Schema = mongoose.Schema ,
	ObjectId = Schema.ObjectId;

var UserSchema = new Schema({
	username : String,
	password : String,
	email	 : String,
	address  : String,
	birthDate: String
});

module.exports = mongoose.model('User', UserSchema);