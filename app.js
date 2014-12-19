var express = require('express');
var http = require('http');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

/**
 * config for session step 1
 * */
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);

/**
 * config mongoose  step 1
 * */
var mongoose = require('mongoose'); 

/**
 * 注册router
 * */
var routes = require('./routes/index');
var users = require('./routes/users');
var home = require('./routes/home');

var app = express();

/**
 * set port
 * */
app.set('port', process.env.PORT || 8090);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

/**
 * set view engine 
 * */
app.set('views',__dirname+'/views');
app.engine('.html',require('ejs').renderFile);
app.set('view engine','html');


// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
/**
 * set my own favicon
 * */
app.use(favicon(__dirname+'/public/images/houselove_favicon.ico'));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

/**
 * config session step 2
 * */
app.use(session({
  secret: 'secret',
  store: new MongoStore({
    url: 'mongodb://localhost/linechat'
  }),
  resave: true,
  saveUninitialized: true,
  cookie :{
	  maxAge:1800000
  }
}));


app.use(express.static(path.join(__dirname, 'public')));

/**
 * 分页面处理router
 * */
app.use('/', routes);
app.use('/home',home);

app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
    
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

/**
 * config mongoose step 2
 * 
 * */
if(app.get('env') === 'development'){
	mongoose.connect('mongodb://localhost/linechat'); //step 2	
}

if(app.get('env') === 'production'){
	mongoose.connect('mongodb://' + process.env.MONGOLAB_URI ); //step 2	
}

/**
 * set server
 * 
 * */
http.createServer(app,function(req,res){
	res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
}).listen(app.get('port'), function(req,res){
	console.log('Express server listening on port ' + app.get('port'));
});

module.exports = app;
