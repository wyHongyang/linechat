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

router.post('/reg',function(req,res){
	var user = new User ({
		username:req.body.username,
		password:req.body.password,
		email:req.body.email,
		address:req.body.address,
		birthDate:req.body.birthDate
	});
	user.save(function (err, user) {  
        if(!err) {  
            console.log(user); 
            User.find(user,function(err,docs){
	       		 if(!err){  
	       	        if(docs!=''){  
	       	            req.session.username = user.username;
	       	            req.session._id = docs[0]._id;
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

router.post('/doReg',function(req,res){
	 var user = {
		 username : req.body.username,
		 password : req.body.password
	 };
	 
	 User.find(user,function(err,docs){
		 if(!err){  
	        if(docs!=''){  
	            console.log(docs); 
	            console.log(user); 
	            console.log(req.session);
	            req.session.username = user.username;
	            req.session._id = docs[0]._id;
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
	res.render('home',{user:user});
});

module.exports = router;