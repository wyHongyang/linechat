/**
 * @version 0.0.1
 * @author hongyang
 * @description handle router home
 */

var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Message = require('../models/message');
var mess = require('../models/mess');
var Ralation = mess.Relation;
var Content  = mess.Content;
/*
 * home.js 处理所有 /home/* 的router所有
 **********************************************
	router.get('/home',function(req,res){
		var user = {};
		user.username = req.session.username;
		res.render('home',{user:user});
	});
  
 */


/**
 * render reply
 * 
 * */
router.get('/reply',function(req,res){
	var user = {};
	user.username = req.session.username;
	user.imageUrl = req.session.imageUrl;
	Message.find({send_to:req.session._id },function(err,messages){
		if(!err){
			if(messages.length){
				user.messages = messages[0];
				res.render('reply',{user:user});
				for(var i =0 ,len =messages[0].content.length;i<len;i++ ){
					messages[0].content[i].is_read = true ;
				}
				messages[0].save(function(err,docs){
					
				});
			}else{
				res.redirect('/home');
			}
		}
	});
});


/**
 * handle reply post
 * 
 * */

router.post('/reply',function(req,res){
	User.find({username:req.body.sendTo},function(err,user){
//		var message = new Message({
//			send_from : req.session._id,
//			send_to   : user[0]._id,
//			content   : req.body.message,
//			sender    : req.body.sender,
//			send_time : req.body.dateString,
//			type      : req.body.type
//		});
//		message.save(function(err,message){
//			if(!err){
//				res.status(200).send({
//					username : req.session.username,
//					message:'send success!'
//				});
//			}else{
//				res.redirect('/');
//			}
//		});
		if(!err){
			Message.find({ send_from : req.session._id ,
				send_to: user[0]._id 
			},function(err,docs){
				if(!err){
					if(docs.length){
						docs[0].content.push({
							body:req.body.message,
							send_time:req.body.dateString
						});
						docs[0].save(function(err,docs){
							if(!err){
								res.status(200).send({
									username : req.session.username,
									message:'send success!'
								});
							}
						});
					}else{
						var message = new Message;
							message.send_from = req.session._id;
							message.send_to   = user[0]._id ;
							message.sender	  = req.session.username;
							message.type	  = req.body.type;
							message.content.push({
								body:req.body.message,
								send_time:req.body.dateString
							});
							message.save(function(err,message){
								if(!err){
									res.status(200).send({
										username : req.session.username,
										message:'send success!'
									});
								}
							});
					}
				}
			});
		}
	});
});

router.get('/chat',function(req,res){
	res.render('chat',{
		chatWith:req.query.chatWith
	});
});

router.post('/chat',function(req,res){
	User.find({username:req.body.sendTo},function(err,user){
		if(!err){
//			var message = new Message({
//				send_from: req.session._id,
//				send_to  : user[0]._id,
//				content  : req.body.message,
//				sender   : req.session.username,
//				send_time: req.body.dateString ,
//				type     : req.body.type
//			});
			/**
			 * 这里需要判断:是否是已经存在了content
			 * 
			 * */
			Message.find({ send_from : req.session._id ,
				send_to: user[0]._id 
			},function(err,docs){
				if(!err){
					var ralation = new Ralation({
						sender:'1',
						sender_id:req.session._id,
						receiver :'231',
						receive_id :req.session._id
					});
					ralation.save(function(err,message){
//						console.log(message);
						var content = new Content({
							_creator : message._id,
							send_time: '1'
						});
						content.save(function(err,content){
//							console.log(content);
							if(err){
								console.log(err);
							}
							console.log(content);
						});
					});
					Content.find({
						send_time:'1'
					}).populate('_creator','sender')
					.exec(function(err,sec){
						console.log(sec);
					});
					if(docs.length){
						docs[0].content.push({
							body:req.body.message,
							send_time:req.body.dateString
						});
						docs[0].save(function(err,docs){
							if(!err){
								res.status(200).send({
									username : req.session.username,
									message:'send success!'
								});
							}
						});
					}else{
						var ralation = new Ralation({
							sender:'1',
							sender_id:req.session._id,
							receiver :'2',
							receive_id :req.session._id
						});
						ralation.save(function(err,message){
							var content = new Content({
								relation : message[0]._id,
								send_time: '1',
								
							});
							console.log(message);
							content.save(function(err,content){
								console.log(content);
							});
						});
						var message = new Message;
							message.send_from = req.session._id;
							message.send_to   = user[0]._id ;
							message.sender	  = req.session.username;
							message.type	  = req.body.type;
							message.content.push({
								body:req.body.message,
								send_time:req.body.dateString
							});
							message.save(function(err,message){
								if(!err){
									res.status(200).send({
										username : req.session.username,
										message:'send success!'
									});
								}
							});
					}
				}
			});
		}
	});
});


/**
 * render index
 * 
 * */

router.get('/index',function(req,res){
	var follower = {
		follower:'12',
		viewer:'2',
		share:'1'	
	};
	var user = {};
	
	User.find({_id : req.session._id},function(err,docs){
		if(!err){
			user.username = docs[0].username;
			var signupDate = docs[0].signupDate;
			user.signupDate = (signupDate.getMonth()+1)+"/"+signupDate.getDate()+"/"+signupDate.getFullYear()+" "+(signupDate.getHours()>9?signupDate.getHours():"0"+signupDate.getHours())+":"
			+(signupDate.getMinutes()>9?signupDate.getMinutes(): "0"+signupDate.getMinutes())+":"+(signupDate.getSeconds()>9?signupDate.getSeconds():"0"+signupDate.getSeconds());
			res.render('index',{ 
				user:user,
				follower:follower
			});	
		}
	});
	
});


module.exports = router;
