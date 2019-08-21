var express = require('express');
var router = express.Router();
var Product = require('../models/product.js');

//查询商品列表
router.get('/', function (req, res, next) {
    var totalCount = 0;
    var searchText = req.param("searchText");
    var pageNum = parseInt(req.param("pageNum"));
    var pageSize = parseInt(req.param("pageSize"));
    var skip = (pageNum - 1) * pageSize;

    Product.find({
        productName: new RegExp(searchText, 'i')
    }, function (allErr, allData) {
        if (allErr) {

            res.json({
                status: '0',
                msg: allErr.message
            })

        } else {
            totalCount = allData.length;

            Product.find({
                productName: new RegExp(searchText, 'i')
            }, {
                _id: 0
            }).skip(skip).limit(pageSize).exec(function (pageErr, pageData) {
                if (pageErr) {

                    res.json({
                        status: '0',
                        msg: pageErr.message
                    })

                } else {
                    res.json({
                        status: '1',
                        msg: '查询成功',
                        totalCount: totalCount,
                        data: pageData
                    })
                }
            })
        }
    });
});

//详情
router.get('/detail', function (req, res, next) {
    var productId = req.param("searchText");

    Product.findOne({
        productId: productId
    }, function (err, data) {
        if (err) {
            res.json({
                status: '0',
                msg: err.message
            })
        } else {
            res.json({
                status: '1',
                msg: '查询成功',
                data: data
            })
        }
    });
});

//添加
router.post('/add', function (req, res, next) {
    var product = {
        productId: '598' + new Date().getTime(),
        productName: req.body.productName,
        productBrief: req.body.productBrief,
        productDescribe: req.body.productDescribe,
        productType: req.body.productType,
        productPrice: req.body.productPrice,
        productImg: req.body.productImg,
        productImgList: req.body.productImgList,
        merchantId: req.body.merchantId,
        merchantName: req.body.merchantName,
        creationTime: req.body.creationTime,
        isNews: req.body.isNews,
        isHot: req.body.isHot
    };


    Product.create(product, function (err, data) {
        if (err) {
            res.json({
                status: '0',
                msg: err.message
            })
        } else {
            res.json({
                status: '1',
                msg: '添加成功',
                data: data
            })
        }
    });
});


//修改
router.post('/edit', function (req, res, next) {
    var product = {
        productId: req.body.productId,
        productName: req.body.productName,
        productBrief: req.body.productBrief,
        productDescribe: req.body.productDescribe,
        productType: req.body.productType,
        productPrice: req.body.productPrice,
        productImg: req.body.productImg,
        productImgList: req.body.productImgList,
        merchantId: req.body.merchantId,
        merchantName: req.body.merchantName,
        creationTime: req.body.creationTime,
        isNews: req.body.isNews,
        isHot: req.body.isHot
    };

    Product.findOne({
        product:product.productId
    },function (err,data) {
        if(err){
            res.json({
                status: '0',
                msg: err.message
            })
        }else{
            data.productName = product.productName;
            data.productBrief = product.productBrief;
            data.productDescribe = product.productDescribe;
            data.productType = product.productType;
            data.productPrice = product.productPrice;
            data.productImg = product.productImg;
            data.productImgList = product.productImgList;
            data.merchantId = product.merchantId;
            data.merchantName = product.merchantName;
            data.creationTime = product.creationTime;
            data.isNews = product.isNews;
            data.isHot = product.isHot;

            data.save(function (editErr,editData) {
                if(editErr){
                    res.json({
                        status: '0',
                        msg: editErr.message
                    })
                }else{
                    res.json({
                        status: '1',
                        msg: '修改成功'
                    })
                }
            })
        }
    })

});

//删
router.post('/del', function (req, res, next) {
    var productId = req.body.productId;

    Product.deleteOne({
        product:productId
    },function (err,data) {
        if(err){
            res.json({
                status: '0',
                msg: err.message
            })
        }else{
            res.json({
                status: '1',
                msg: '删除成功'
            })
        }
    })

});


module.exports = router;
