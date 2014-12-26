/**
 * message change schema 
 * @description 用于聊天，回复
 * MessageSchema
 * @field sender 发送人
 * @field send_id 发送人的id
 * @field receiver 接收人
 * @field receive_id 接收人id
 * @field content message内容
 * 
 */

var mongoose = require('mongoose'),
	Schema 	 = mongoose.Schema ,
	ObjectId = Schema.ObjectId;

var RelationSchema = new Schema({
	sender 	   : { type:String, required:true },
	sender_id  : { type:ObjectId, required:true },
	receiver   : { type:String, required:true },
	receive_id : { type:ObjectId, required:true },
	content    : [{ type:Schema.Types.ObjectId, ref:'Content'}]//外键  _id 
});

/**
 * message content schema 
 * @description 用于聊天，回复 内容体
 * MessageContentSchema
 * @field relation 连接一个MessageSchema
 * @field send_time 发送时间
 * @field send_content 发送内容
 * @field is_read 是否已读
 * @field type 接收类型 0 send 1 receive 
 *  
 */

var ContentSchema = Schema({
	_creator     : { type:ObjectId, ref: 'Relation' },//匹配
	send_time    : { type:String, required:true },
	send_content : { type:String },
	is_read      : { type:Boolean, default:false},
	type         : { type:Number, default:0 }
});

var Relation = exports.Relation = mongoose.model('Relation', RelationSchema);
var Content  = exports.Content  = mongoose.model('Content', ContentSchema);
