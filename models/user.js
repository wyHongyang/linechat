/**
 * @description 用于用户记录 message
 * 
 * 
 * */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema ,
	ObjectId = Schema.ObjectId;

var UserSchema = new Schema({
	username  : { type:String,required:true },
	password  : { type:String,required:true },
	email	  : { type:String,required:true },
	gender	  : { type:Number,default:0},//type: 0 表示男,1表示女
	profile_image_url : {type:String,default:'../images/head-m.gif'},//默认头像
	birthDate : { type:Date,default:Date.now},//生日
	signupDate:	{ type:Date,default:Date.now} //注册时间，系统默认
});

//UserSchema.add({ signupDate:{type:Date,default:Date.now}});
UserSchema.virtual('user.full').get(function(){
	return this.username+','+this.profile_image_url;
});

UserSchema.virtual('user.full').get(function(user){
	var userinfo = user.split(',');
	this.username = userinfo[0],
	this.profile_image_url = userinfo[1];
});

module.exports = mongoose.model('User', UserSchema);