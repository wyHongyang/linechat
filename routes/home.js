/**
 * @version 0.0.1
 * @author hongyang
 * @description handle router home
 */

var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Message = require('../models/message');

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
 * */
router.get('/reply',function(req,res){
	var user = {};
	user.username = req.session.username;
	Message.find({send_to:req.session._id,is_read:false},function(err,messages){
		if(!err){
			user.messages = messages;
			res.render('reply',{user:user});
		}
	});
});


/**
 * handle reply post
 * 
 * */

router.post('/reply',function(req,res){
	User.find({username:req.body.sender},function(err,user){
		console.log(user);
		var message = new Message({
			send_from : req.session._id,
			send_to   : user[0]._id,
			content   : req.body.message,
			sender    : req.body.sender,
			send_time : req.body.dateStraing,
			type      : req.body.type
		});
		message.save(function(err,message){
			if(!err){
				res.status(200).send({
					username : req.session.username,
					message:'send success!'
				});
			}else{
				res.redirect('/');
			}
		});
	});
});

router.get('/chat',function(req,res){
	res.render('chat');
});

router.post('/chat',function(req,res){
	User.find({username:req.body.sender},function(err,user){
		if(!err){
			var message = new Message({
				send_from: req.session._id,
				send_to  : user[0]._id,
				content  : req.body.message,
				sender   : req.session.username,
				send_time: req.body.dateString ,
				type     : req.body.type
			});
			console.log(req.body);
			message.save(function(err,message){
				if(!err){
					res.status(200).send({
						username : req.session.username,
						message:'send success!'
					});
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
