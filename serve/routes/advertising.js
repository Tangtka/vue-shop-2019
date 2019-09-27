const express = require('express');
const router = express.Router();
const Advertising = require('../models/Advertising.js');
const tool = require('../utils/tool.js');

/*
* 广告列表
* */
router.post('/list', function (req, res, next) {
    let pageNum = parseInt(req.body.pageNum);
    let pageSize = parseInt(req.body.pageSize);
    let pageCount = 0;

    let advertising = Advertising.find({
        status:1
    },{
        _id:0,
        __v:0
    });
    advertising.sort({createTime:-1});
    advertising.skip((pageNum-1)*pageSize);
    advertising.limit(pageSize);

    Advertising.count({
        status:1
    },(err,count)=>{
        if(err){
            res.json({
                status:0,
                message:err,
                result:{}
            })
        }
        pageCount = count;
        advertising.exec((err,advertising)=>{
            if(err){
                res.json({
                    status:0,
                    message:err,
                    result:{}
                })
            }
            res.json({
                status:1,
                message:'查询成功',
                pageCount:pageCount,
                result:advertising,
            })
        });
    });




});

/*
* add广告
* */
router.post('/add', function (req, res, next) {
    let advertisingId = 'a'+ tool.getRandom(),
        advertisingTitle = req.body.advertisingTitle,
        advertisingUrl = req.body.advertisingUrl,
        advertisingImg = req.body.advertisingImg,
        advertisingType = req.body.advertisingType,
        advertisingTypeName = req.body.advertisingTypeName,
        isPutaway = req.body.isPutaway,
        status = 1,
        createTime = tool.dateFormat(new Date(),'yyyy-MM-dd hh:mm:ss'),
        updateTime = tool.dateFormat(new Date(),'yyyy-MM-dd hh:mm:ss');

    Advertising.create({
        advertisingId,
        advertisingTitle,
        advertisingUrl,
        advertisingImg,
        advertisingType,
        advertisingTypeName,
        isPutaway,
        status,
        createTime,
        updateTime
    },(err,advertising)=>{
        if(err){
            res.json({
                status:0,
                message:err,
                result:{}
            })
        }
        res.json({
            status:1,
            message:'添加成功',
            result:{}
        })
    })
});


/*
* del广告
* */
router.post('/del', function (req, res, next) {
    let advertisingId = req.body.advertisingId;

    Advertising.findOneAndUpdate({
        advertisingId,
        status:1
    },{
        status:0
    },(err,advertising)=>{
        if(err){
            res.json({
                status:0,
                message:err,
                result:{}
            })
        }
        if(!advertising){
            res.json({
                status:0,
                message:'不存在该Id',
                result:{}
            })
        }else{
            res.json({
                status:1,
                message:'删除成功',
                result:{}
            })
        }

    });
});


/*
* edit广告
* */
router.post('/edit', function (req, res, next) {
    let advertisingId = req.body.advertisingId,
        advertisingTitle = req.body.advertisingTitle,
        advertisingUrl = req.body.advertisingUrl,
        advertisingImg = req.body.advertisingImg,
        advertisingType = req.body.advertisingType,
        advertisingTypeName = req.body.advertisingTypeName,
        isPutaway = req.body.isPutaway;

    Advertising.findOneAndUpdate({
        advertisingId,
        status:1
    },{
        advertisingId,
        advertisingTitle,
        advertisingUrl,
        advertisingImg,
        advertisingType,
        advertisingTypeName,
        isPutaway,
        updateTime:tool.dateFormat(new Date(),'yyyy-MM-dd hh:mm:ss')
    },(err,advertising)=> {
        if (err) {
            res.json({
                status: 0,
                message: err,
                result: {}
            })
        }
        if (!advertising) {
            res.json({
                status: 0,
                message: '不存在该Id',
                result: {}
            })
        } else {
            res.json({
                status: 1,
                message: '修改成功',
                result: {}
            })
        }
    });
});

/*
* 根据id查某一条
* */
router.post('/findOne', function (req, res, next) {
    let advertisingId = req.body.advertisingId;

    Advertising.findOne({
        advertisingId,
        status:1
    },{
        _id:0,
        __v:0
    },(err,advertising)=> {
        if (err) {
            res.json({
                status: 0,
                message: err,
                result: {}
            })
        }
        if (!advertising) {
            res.json({
                status: 0,
                message: '不存在该Id',
                result: {}
            })
        } else {
            res.json({
                status: 1,
                message: '查询成功',
                result: advertising
            })
        }
    });
});

module.exports = router;
