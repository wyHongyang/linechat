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
 * render chat
 * */
router.get('/chat',function(req,res){
	var user = {};
	user.username = req.session.username;
	res.render('chat',{user:user});
});


/**
 * handle chat post
 * 
 * */

router.post('/chat',function(req,res){
	var message = new Message({
		master_id : req.session._id,
		content   : req.body.message,
		create_at : req.body.dateStraing,
		sendTo_id : req.session._id
	});
	message.save(function(err,message){
		if(!err){
			res.send(200,{
				username : req.session.username,
				message:'send success!'
			});
		}else{
			res.redirect('/');
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
			user.signupDate = (signupDate.getMonth()+1)+"/"+signupDate.getDate()+"/"+signupDate.getFullYear()+" "+signupDate.getHours()+":"+signupDate.getMinutes()+":"+signupDate.getSeconds();
			res.render('index',{ 
				user:user,
				follower:follower
			});	
		}
	});
	
});


module.exports = router;
