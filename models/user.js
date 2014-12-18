/**
 * @description 用于用户记录 message
 * 
 * 
 * */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema ,
	ObjectId = Schema.ObjectId;

var UserSchema = new Schema({
	username : { type:String,required:true },
	password : { type:String,required:true },
	email	 : { type:String,required:true },
	birthDate: { type:Date,default:Date.now}
});

UserSchema.add({ signupDate:{type:Date,default:Date.now}});

module.exports = mongoose.model('User', UserSchema);