var express = require('express');
var router = express.Router();
const BasicConfig = require('../models/BasicConfig.js');
const tool = require('../utils/tool.js');
/*
* 查询操作记录*/
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

module.exports = router;
