const express = require('express');
const router = express.Router();
const Dictionaries = require('./../module/Dictionaries.js');
const BasicConfig = require('./../module/BasicConfig.js');

/*
* 查询字典
* parentId
* */
router.get('/', function(req, res, next) {
    let parentId = req.query.parentId || '';

    Dictionaries.find({
        parentId:parentId
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

module.exports = router;
