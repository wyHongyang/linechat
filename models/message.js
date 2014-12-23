/**
 * @description 用于聊天,回复记录 message
 * TODO 
 * 消息包括：
 * 谁发过来的，什么内容，什么时间，发给谁
 * 消息种类都统称为type
 * 
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema ,
	ObjectId = Schema.ObjectId;

var MessageSchema = new Schema({
	send_from 	: { type : ObjectId, required : true },
	send_to 	: { type : ObjectId, required : true },
	sender		: { type : String },
	content		: [{ 
					 body      : { type : String },
					 send_time : { type : String },
					 is_read   : { type : Boolean, default:false}
				  }],
	/**
	 * TODO 
	 * @param type : send:评论 reply:回复,@:at ,view:点击  
	 * */
	type		: { type : String}
});

module.exports = mongoose.model('Message', MessageSchema);
