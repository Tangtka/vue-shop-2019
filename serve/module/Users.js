const mongoose = require('mongoose');

const UsersSchema = new mongoose.Schema({
    userId:String,
    userName:String, //用户名
    userPwd:String, //密码
    accountType:Number, // 账号类型
    mobile:String, //手机号
    status:Number, //状态
    createTime:String, //创建时间
    updateTime:String //更新时间
});

module.exports = mongoose.model('users',UsersSchema);