const mongoose = require('mongoose');

const AdvertisingSchema = new mongoose.Schema({
    advertisingId:String, //id
    advertisingTitle:String, //广告标题
    advertisingUrl:String, //广告url
    advertisingImg:String, //图片
    advertisingType:Number, // 广告类型
    advertisingTypeName:String, // 广告类型
    isPutaway:Boolean, //是否上架
    status:Number, //状态
    createTime:String, //创建时间
    updateTime:String //更新时间
});

module.exports = mongoose.model('advertising',AdvertisingSchema);