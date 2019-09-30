const express = require('express');
const router = express.Router();
const Product = require('../models/Product.js');
const tool = require('../utils/tool.js');

/*
* 列表
* */
router.post('/list', function (req, res, next) {
    let pageNum = parseInt(req.body.pageNum),
        pageSize = parseInt(req.body.pageSize),
        product = null;

    product = Product.find({
        status: 1
    }, {
        _id: 0,
        __v: 0
    });
    product.sort({createTime: -1});
    product.skip((pageNum - 1) * pageSize);
    product.limit(pageSize);

    Product.count({
        status: 1
    }, (err, count) => {
        if (err) {
            res.json({
                status: 0,
                message: err,
                result: {}
            })
        }
        product.exec((productErr, product) => {
            if (productErr) {
                res.json({
                    status: 0,
                    message: productErr,
                    result: {}
                })
            }
            res.json({
                status: 1,
                message: '查询成功',
                pageCount: count,
                result: product,
            })
        });
    });
});

/*
* add
* */
router.post('/add', function (req, res, next) {
    let params = {
        productId:'p' + tool.getRandom(), //id
        productName:req.body.productName, //名称
        productPrice:req.body.productPrice, //价格
        productImg:req.body.productImg, //封面图
        productImgList:req.body.productImgList, //图片列表
        isHot:req.body.isHot, //热销
        isNewProduct:req.body.isNewProduct, //新品
        status:1, //状态
        createTime:tool.dateFormat(new Date(), 'yyyy-MM-dd hh:mm:ss'), //创建时间
        updateTime:tool.dateFormat(new Date(), 'yyyy-MM-dd hh:mm:ss') //更新时间
    };

    Product.findOne({
        productName: params.productName,
        status: 1,
    }, (err, product) => {
        if (err) {
            res.json({
                status: 0,
                message: err,
                result: {}
            })
        }

        if (product) {
            res.json({
                status: 0,
                message: '名字重复',
                result: {},
            })
        } else {
            Product.create(params, (addErr, addProduct) => {
                if (addErr) {
                    res.json({
                        status: 0,
                        message: addErr,
                        result: {}
                    })
                } else {
                    res.json({
                        status: 1,
                        message: '添加成功',
                        result: {}
                    })
                }
            })
        }
    });
});


/*
* edit
* */
router.post('/edit', function (req, res, next) {
    let params = {
        productId:req.body.productId, //id
        productName:req.body.productName, //名称
        productPrice:req.body.productPrice, //价格
        productImg:req.body.productImg, //封面图
        productImgList:req.body.productImgList, //图片列表
        isHot:req.body.isHot, //热销
        isNewProduct:req.body.isNewProduct, //新品
        updateTime:tool.dateFormat(new Date(), 'yyyy-MM-dd hh:mm:ss') //更新时间
    };

    Product.findOneAndUpdate({
        productId: params.productId,
        status: 1,
    },{
        productName:params.productName,
        productPrice:params.productPrice,
        productImg:params.productImg,
        productImgList:params.productImgList,
        isHot:params.isHot,
        isNewProduct:params.isNewProduct,
        updateTime:params.updateTime,
    }, (err, product) => {
        if (err) {
            res.json({
                status: 0,
                message: err,
                result: {}
            })
        }
        if (product) {
            res.json({
                status: 1,
                message: '修改成功',
                result: {}
            })
        } else {
            res.json({
                status: 0,
                message: '查询不到该产品',
                result: {}
            })
        }
    });
});


/*
* del
* */
router.post('/del', function (req, res, next) {
    let productId = req.body.productId;

    Product.findOneAndUpdate({
        productId: productId,
        status: 1,
    },{
        status: 0,
    }, (err, product) => {
        if (err) {
            res.json({
                status: 0,
                message: err,
                result: {}
            })
        }
        if (product) {
            res.json({
                status: 1,
                message: '删除成功',
                result: {}
            })
        } else {
            res.json({
                status: 0,
                message: '查询不到该产品',
                result: {}
            })
        }
    });
});


/*
* findOne
* */
router.post('/findOne', function (req, res, next) {
    let productId = req.body.productId;

    Product.findOne({
        productId: productId,
        status: 1,
    },{
        _id:0,
        __v:0
    }, (err, product) => {
        if (err) {
            res.json({
                status: 0,
                message: err,
                result: {}
            })
        }
        if (product) {
            res.json({
                status: 1,
                message: '查询成功',
                result: {}
            })
        } else {
            res.json({
                status: 0,
                message: '查询不到该产品',
                result: {}
            })
        }
    });
});


module.exports = router;