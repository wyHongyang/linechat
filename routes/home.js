/**
 * @version 0.0.1
 * @author hongyang
 * @description handle router home
 */

var express = require('express');
var router = express.Router();
var User = require('../models/user');

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
	res.render('chat');
});

/**
 * render index
 * */

router.get('/index',function(req,res){
	var user={
		username:'sam',
		password:'admin'
	};
	
	var joinTime = {
		time : '12/2/2014'	
	};
	
	var follower = {
		follower:'12',
		viewer:'2',
		share:'1'	
	};
	
	res.render('index',{ 
		user:user,
		joinTime:joinTime,
		follower:follower
	});
});


module.exports = router;
