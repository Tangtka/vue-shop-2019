const mongoose = require('mongoose');

const BasicConfigSchema = new mongoose.Schema({
    typeCode:String, //类型
    websiteName:String, //名称
    websiteBrief:String, //简介
    websiteKeyword:String, //关键词
    websiteDescribe:String, //描述
    websiteIcon:String, //网站icon
    websiteLogo:String, //网站logo
    websiteCopyright:String, //版权信息
    InternetContentProvider:String, //备案号
    fileBrowsingAddress:String, //文件浏览地址
    fileUploadAddress:String, //文件上传地址
    status:Number //状态
});

module.exports = mongoose.model('basic_config',BasicConfigSchema);