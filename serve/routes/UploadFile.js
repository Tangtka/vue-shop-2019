var express = require('express');
var router = express.Router();
var fs = require('fs');
var formidable = require('formidable');

/* GET home page. */
router.post('/', function(req, res, next) {
    var imgName = 'vue-shop-img'+new Date().getTime();
    var form = new formidable.IncomingForm();

    // form.uploadDir = 'upload';

    form.parse(req, function(err, fields, files) {
        var type = files.file.name.slice(files.file.name.lastIndexOf('.'),files.file.name.length); //获取图片后缀
        fs.renameSync(files.file.path, 'http://pegasus.org.cn:59889/file/vue-shop-img/'+imgName+type); //更改名字
        res.json({
            status: '1',
            msg: '上传成功',
            data:imgName+type
        })
    });


});

module.exports = router;