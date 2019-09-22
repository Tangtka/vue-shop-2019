const express = require('express');
const router = express.Router();
const Dictionaries = require('../models/Dictionaries.js');
const BasicConfig = require('../models/BasicConfig.js');
const tool = require('../utils/tool.js');

/*
* 查询字典
* parentId
* */
router.get('/dictionaries/list', function(req, res, next) {
    let parentId = req.query.parentId || '';

    Dictionaries.find({
        parentId,
        status:1
    },{
        _id:0
    },(err,dictionaries)=>{
        if(err){
            res.json({
                status:0,
                message:err,
                result:{}
            })
        }else{
            res.json({
                status:1,
                message:'查询成功',
                result:dictionaries
            })
        }
    });

});

/*
* 添加字典
* parentId
* */
router.post('/dictionaries/add', function(req, res, next) {
    let dictionaryId = 'd'+ tool.getRandom(),
        dictionaryCode = req.body.dictionaryCode,
        dictionaryName = req.body.dictionaryName,
        parentId = req.body.parentId || '';

    Dictionaries.findOne({
        dictionaryCode,
        dictionaryName,
    },(err,dictionaries)=>{
        if(err){
            res.json({
                status:0,
                message:err,
                result:{}
            })
        }else{
            if(dictionaries){
                res.json({
                    status:0,
                    message:'字段冲突',
                    result:{}
                })
            }else{
                Dictionaries.create({
                    dictionaryId,
                    dictionaryCode,
                    dictionaryName,
                    parentId,
                    status:1
                }, (addErr, addDictionaries)=> {
                    if(addErr){
                        res.json({
                            status:0,
                            message:'添加失败',
                            result:{}
                        })
                    }else{
                        res.json({
                            status:1,
                            message:'添加成功',
                            result:{}
                        })
                    }
                });
            }
        }
    });

});

/*
* 删除字典
* parentId
* */
router.post('/dictionaries/del', function(req, res, next) {
    let dictionaryId = req.body.dictionaryId;

    Dictionaries.findOneAndUpdate({
        dictionaryId,
        status:1
    },{
        status:0
    },(err,dictionaries)=>{
        if(!dictionaries){
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
* 修改字典
* parentId
* */
router.post('/dictionaries/edit', function(req, res, next) {
    let dictionaryId = req.body.dictionaryId,
        dictionaryCode = req.body.dictionaryCode,
        dictionaryName = req.body.dictionaryName;

    Dictionaries.findOneAndUpdate({
        dictionaryId:dictionaryId,
        status:1
    },{
        dictionaryId,
        dictionaryCode,
        dictionaryName,
        status:1
    },(err,dictionaries)=>{
        if(!dictionaries){
            res.json({
                status:0,
                message:'不存在该Id',
                result:{}
            })
        }else{
            res.json({
                status:1,
                message:'修改成功',
                result:{}
            })
        }

    });

});



module.exports = router;
