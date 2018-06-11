var express = require('express');
var app = express();
var mongoose = require('mongoose');
var path = require('path');
var cookieParase = require('cookie-parser');
require('./connect.js');
require('./model.js');
var User = mongoose.model('yjw'); //User为model name
mongoose.Promise = global.Promise; //为了避免警告的出现，因为mongoose的默认promise已经弃用了

app.use(express.static(path.join(__dirname, 'public')));
/**
 * 配置登录视图
 */
app.get('/', function(req, res) {
	res.sendfile(__dirname + "/public/" + "login.html");
})

/**
 * 处理登录逻辑
 */
app.get('/login', function(req, res) {
	var name = req.query.userid;
	var pwd = req.query.pwd;
	User.findOne({
		name: name,
		pwd: pwd
	}, function(error, result) {
		console.log("result:" + result)
		if(result == null) {
			res.sendfile(__dirname + "/public/" + "login_no.html");
		} else {
			res.cookie('userName', result.name);
			res.sendfile(__dirname + "/public/" + "login_ok.html");
			
		}
	})
})
/**
 * 配置注册视图
 */
app.get('/register.html', function(req, res) {
	res.sendfile(__dirname + "/" + "register.html");
})
/**
 * 处理注册逻辑
 */
app.get('/register', function(req, res) {
	var name = req.query.userid;
	var pwd = req.query.pwd;
	User.findOne({
		name: name,
		pwd: pwd
	}, function(error, result) {
		console.log("result:" + result)
		if(result == null) {
			var user = new User({
				name: name,
				pwd: pwd
			});
			user.save(function(err, jieguo) {
				console.log("jieguo:" + jieguo);
				if(jieguo == null) {
					res.sendfile(__dirname + "/public/" + "no.html");
				} else {
					res.sendfile(__dirname + "/public/" + "register_OK.html");
				}
			});
		} else {
			res.send("<script>alert('账号已存在！');window.history.go(-1);</script>");
		}
	})

})

/**
 * 端口监听
 * @type {http.Server}
 */
var server = app.listen(3030, function() {
	console.log("start");
})