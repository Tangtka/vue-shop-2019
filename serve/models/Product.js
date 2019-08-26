var mongoose = require('mongoose');

var productSchema = new mongoose.Schema({
    "productId" : String,
    "productName" : String,
    "productBrief" : String,
    "productDescribe" : String,
    "productType" : String,
    "productPrice" : String,
    "productImg" : String,
    "productImgList" : String,
    "merchantId":String,
    "merchantName":String,
    "creationTime":String,
    "isNews":Boolean,
    "isHot":Boolean

});

module.exports = mongoose.model('product',productSchema);