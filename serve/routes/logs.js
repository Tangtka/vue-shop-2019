var express = require('express');
var router = express.Router();
const Logs = require('../models/Logs.js');
const tool = require('../utils/tool.js');
/*
* 查询操作记录*/
router.post('/list', function(req, res, next) {
    let pageNum = parseInt(req.body.pageNum);
    let pageSize = parseInt(req.body.pageSize);
    let pageCount = 0;

    let log = Logs.find({
        status:1
    },{
        _id:0,
        __v:0
    });
    log.sort({createTime:-1});
    log.skip((pageNum-1)*pageSize);
    log.limit(pageSize);

    Logs.count({
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
        log.exec((err,logs)=>{
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
                result:logs,
            })
        });
    });
});

module.exports = router;
