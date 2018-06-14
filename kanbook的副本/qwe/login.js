var express = require('express');
var app = express();
var mongoose = require('mongoose');
var path = require('path');
var cookieParase = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors');
require('./connect.js');
require('./model.js');
var User = mongoose.model('yjw'); //User为model name
mongoose.Promise = global.Promise; //为了避免警告的出现，因为mongoose的默认promise已经弃用了

app.use(cors());
app.use(bodyParser.urlencoded({
	extend: false
}));
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
				pwd: pwd,
				shoucang: [

				],
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
//处理收藏逻辑
app.post('/detail', function(req, res) {
	var name = req.body.name;
	var shoucang = [{
		bookid: req.body.bookid,
		bookname: req.body.bookname,
		bookauthor: req.body.bookauthor,
		bookdes: req.body.bookdes,
	}];
	console.log("name:" + name);
	console.log("shoucang:" + shoucang[0].bookid);
	User.findOne({
		name: name
	}, function(err, doc) {
		console.log(doc);
		if(doc.shoucang[0]) {
			// 取消收藏
			User.update({
				name: name
			}, {
				$set: {
					shoucang: []
				}
			}, function(error, result) {
				if(result == null) {
					res.send("2");
				} else {
					// 取消收藏成功
					res.send("3");
				}
			})
		} else {
			// 收藏
			User.update({
				name: name
			}, {
				$set: {
					shoucang: shoucang
				}
			}, function(error, result) {
				console.log("update:" + result);
				if(result == null) {
					res.send("0");
				} else {
					res.send("1");
				}
			})
		}
	})

});

//显示收藏逻辑
app.get('/personal', function(req, res) {
	var name = req.query.name;
	User.findOne({
		name: name,
	}, function(err, result) {
		if(result.shoucang[0] != null) {
			
			var jsondata = [{
				bookid: result.shoucang[0].bookid,
				bookname: result.shoucang[0].bookname,
				bookauthor: result.shoucang[0].bookauthor,
				bookdes: result.shoucang[0].bookdes,
			}];
			res.send(jsondata);
		} else {
			res.send("1");
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