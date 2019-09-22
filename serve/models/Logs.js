const mongoose = require('mongoose');

const LogSchema = new mongoose.Schema({
    logId:String,
    createTime:String, //操作时间
    operationContent:String, //具体操作
    userId:String, //操作用户id
    userName:String, //操作用户
    browser:String, //浏览器
    status:Number, //状态
});

module.exports = mongoose.model('logs',LogSchema);