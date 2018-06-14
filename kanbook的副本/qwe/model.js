var mongoose = require('mongoose');
var UserSchema = new mongoose.Schema({ //定义数据模型
	name: String,
	pwd: String,
	shoucang: [{
		bookid: String,
		bookname: String,
		bookauthor: String,
		bookdes: String,
	}],

});
mongoose.model('yjw', UserSchema); //将该Schema发布为Model,第一个参数为数据库的集合，没有会自动创建