const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    productId:String, //id
    productName:String, //名称
    productPrice:String, //价格
    productImg:String, //封面图
    productImgList:String, //图片列表
    isHot:Boolean, //热销
    isNewProduct:Boolean, //新品
    status:Number, //状态
    createTime:String, //创建时间
    updateTime:String //更新时间
});

module.exports = mongoose.model('product',ProductSchema);