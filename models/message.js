/**
 * @description 用于聊天记录 message
 * 
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema ,
	ObjectId = Schema.ObjectId;

var MessageSchema = new Schema({
	master_id : {type: ObjectId ,required:true},
	content   : {type: String }, 
	sendTo_id : {type: ObjectId,required:true},
	create_at : {type:Date,default:Date.now}
});

module.exports = mongoose.model('Message', MessageSchema);
