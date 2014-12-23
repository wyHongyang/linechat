//var express = require('express');
//var router = express.Router();
//
/* GET home page. */
//router.get('/', function(req, res) {
//  res.render('index', { title: 'Express' });
//});
//
//module.exports = router;

/**
 * @version 0.0.1
 * @author hoangyang
 * @description handle sign event
 */

var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Message = require('../models/message');
/**
 * @description get home page
 * 
 * */

router.get('/',function(req,res){
	res.render('login');
});

/**
 * 相应注册
 * */

router.post('/signup',function(req,res){
	var user = new User ({
		username : req.body.username,
		password : req.body.password,
		email    : req.body.email,
		birthDate: req.body.birthDate,
		gender   : req.body.gender
	});
	user.save(function (err, user) {  
        if(!err) {  
            User.find(user,function(err,docs){
	       		 if(!err){  
	       	        if(docs!=''){  
	       	            req.session.username = user.username;
	       	            req.session._id = docs[0]._id;
	       	            req.session.imageUrl = docs[0].profile_image_url;
	       	            return res.redirect('/home');
	       	        } else{  
	       	            return res.redirect('/');  
	       	          }  	       	  
	       	        }else{  
	       	           console.log("Something happend.");  
	       	       }  
	       	 });
        }          
    });  
});

/**
 * 相应登陆
 * 
 * */

router.post('/login',function(req,res){
	 var user = {
		 email : req.body.email,
		 password : req.body.password
	 };
	 
	 User.find(user,function(err,docs){
		 if(!err){  
	        if(docs!=''){  
	            req.session.username = docs[0].username;
	            req.session._id = docs[0]._id;
	            req.session.imageUrl = docs[0].profile_image_url;
//	            return res.redirect('/home'+"?id="+docs[0]._id+'');  
	            return res.redirect('/home');
	        } else{  
	            console.log('用户名或密码不正确');  
	            return res.redirect('/');  
	            }  
	  
	        }else{  
	           console.log("Something happend.");  
	       }  
	 });
});

router.get('/home',function(req,res){
	var user = {};
	user.username = req.session.username;
	user.imageUrl = req.session.imageUrl;
	Message.find({send_to:req.session._id},function(err,messages){
		if(!err){
			user._id = req.session._id;
			user.messages = messages;
			res.render('home',{user:user});
		}
	});
});

router.post('/home',function(req,res,next){
	req.session.cookie.send_from = req.body.send_from;
	console.log(req.body.send_from);
	req.session.save(function(err){
		if(!err){
			next();
		}
	});
});

module.exports = router;