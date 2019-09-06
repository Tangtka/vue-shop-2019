const mongoose = require('mongoose');

const BasicConfigSchema = new mongoose.Schema({
    websiteName:String, //名称
    websiteBrief:String, //简介
    websiteKeyword:String, //关键词
    websiteDescribe:String, //描述
    websiteCopyright:String, //版权信息
    InternetContentProvider:String, //备案号
    fileBrowsingAddress:String, //文件浏览地址
    fileUploadAddress:String, //文件上传地址
});

module.exports = mongoose.model('basic_config',BasicConfigSchema);