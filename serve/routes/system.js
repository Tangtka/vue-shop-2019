const express = require('express');
const router = express.Router();
const Dictionaries = require('../models/Dictionaries.js');
const BasicConfig = require('../models/BasicConfig.js');
const tool = require('../utils/tool.js');

/*
* 查询字典
* parentId
* */
router.post('/dictionaries/list', function(req, res, next) {
    let parentId = req.body.parentId || '';

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
        }
        res.json({
            status:1,
            message:'查询成功',
            result:dictionaries
        })
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
        }

        if(dictionaries){
            res.json({
                status:0,
                message:'字段冲突',
                result:{}
            })
        }

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
        if(err){
            res.json({
                status:0,
                message:err,
                result:{}
            })
        }
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
        if(err){
            res.json({
                status:0,
                message:err,
                result:{}
            })
        }
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

/*
* 查询网站设置
* parentId
* */
router.get('/basicConfig', function(req, res, next) {

    BasicConfig.findOne({
        status:1,
        typeCode:'SYSTEM_SET'
    },{
        _id:0,
        __v:0
    },(err,basicConfig)=>{
        if(err){
            res.json({
                status:0,
                message:err,
                result:basicConfig
            })
        }

        res.json({
            status:1,
            message:'查询成功',
            result:basicConfig
        })

    });

});

/*
* 修改网站设置
* parentId
* */
router.post('/basicConfig/edit', function(req, res, next) {
    let websiteName = req.body.websiteName || '',
        websiteBrief = req.body.websiteBrief || '',
        websiteKeyword = req.body.websiteKeyword || '',
        websiteDescribe = req.body.websiteDescribe || '',
        websiteIcon = req.body.websiteIcon || '',
        websiteLogo = req.body.websiteLogo || '',
        websiteCopyright = req.body.websiteCopyright || '',
        InternetContentProvider = req.body.InternetContentProvider || '',
        fileBrowsingAddress = req.body.fileBrowsingAddress || '',
        fileUploadAddress = req.body.fileUploadAddress || '';

    BasicConfig.findOneAndUpdate({
        typeCode:'SYSTEM_SET',
        status:1
    },{
        websiteName,
        websiteBrief,
        websiteKeyword,
        websiteDescribe,
        websiteIcon,
        websiteLogo,
        websiteCopyright,
        InternetContentProvider,
        fileBrowsingAddress,
        fileUploadAddress
    },(err,basicConfig)=>{
        if(err){
            res.json({
                status:0,
                message:err,
                result:{}
            })
        }
        if(basicConfig){
            res.json({
                status:1,
                message:'修改成功',
                result:{}
            })
        }else{
            BasicConfig.create({
                websiteName,
                websiteBrief,
                websiteKeyword,
                websiteDescribe,
                websiteIcon,
                websiteLogo,
                websiteCopyright,
                InternetContentProvider,
                fileBrowsingAddress,
                fileUploadAddress,
                status:1,
                typeCode:'SYSTEM_SET'
            },(addErr,addBasicConfig)=>{
                if(err){
                    res.json({
                        status:0,
                        message:addErr,
                        result:{}
                    })
                }
                res.json({
                    status:1,
                    message:'添加成功',
                    result:{}
                })
            })
        }

    });

});

module.exports = router;
