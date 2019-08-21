var express = require('express');
var router = express.Router();
var systemSettings = require('../models/systemSettings.js');

/* GET home page. */
router.get('/', function (req, res, next) {
    systemSettings.findOne({
        configCode: 'system_setting'
    }, {
        _id: 0
    }, function (settingErr, settingRes) {
        if (settingErr) {
            res.json({
                status: '0',
                msg: settingErr.message
            })
        } else {
            res.json({
                status: '1',
                msg: '',
                data: settingRes
            })
        }
    })
});
router.post('/edit', function (req, res, next) {
    var params = {
        configCode: 'system_setting',
        websiteName: req.param("websiteName"),
        websiteProfile: req.param("websiteProfile"),
        websiteKeywords: req.param("websiteKeywords"),
        websiteDescription: req.param("websiteDescription"),
        websiteIcon: req.param("websiteIcon"),
        copyrightInformation: req.param("copyrightInformation"),
        InternetContentProvider: req.param("InternetContentProvider"),
        fileServerAddress: req.param("fileServerAddress")
    };


    systemSettings.findOne({
        configCode: 'system_setting'
    }, {}, function (settingErr, settingRes) {
        if (settingErr) {
            res.json({
                status: '0',
                msg: settingErr.message
            })
        } else {
            if (settingRes) {
                settingRes.configCode = params.configCode;
                settingRes.websiteName = params.websiteName;
                settingRes.websiteProfile = params.websiteProfile;
                settingRes.websiteKeywords = params.websiteKeywords;
                settingRes.websiteDescription = params.websiteDescription;
                settingRes.websiteIcon = params.websiteIcon;
                settingRes.copyrightInformation = params.copyrightInformation;
                settingRes.InternetContentProvider = params.InternetContentProvider;
                settingRes.fileServerAddress = params.fileServerAddress;

                settingRes.save(function (editErr,editRes) {
                    if (editErr) {
                        res.json({
                            status: '0',
                            msg: editErr.message
                        })
                    } else {
                        res.json({
                            status: '1',
                            msg: '修改成功',
                            data:editRes
                        })
                    }
                })
            } else {

                systemSettings.create(params, function (addErr, addRes) {
                    if (addErr) {
                        res.json({
                            status: '0',
                            msg: addErr.message
                        })
                    } else {
                        res.json({
                            status: '1',
                            msg: '添加成功',
                            data:addRes
                        })
                    }
                })
            }
        }
    })

});

module.exports = router;
