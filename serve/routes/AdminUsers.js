var express = require('express');
var router = express.Router();
var AdminUsers = require('../models/AdminUsers.js');
var redis = require('../redis/index.js');


//判断是否登录
router.get('/loginCheck', function (req, res, next) {
    var userId = req.param("userId");
    redis.findKey(userId,function(redisErr,redisRes){
        if(redisErr){
            res.json({
                status: '0',
                msg: redisErr
            })
        }else{
            if(redisRes === 'OK'){
                res.json({
                    status: '1',
                    msg: '已登录'
                })
            }else{
                res.json({
                    status: '0',
                    msg: '未登录'
                })
            }
        }
    })

});

//登录
router.post('/login', function (req, res, next) {
    var userName = req.param("userName");
    var userPwd = req.param("userPwd");

    AdminUsers.findOne({
        userName: userName,
        userPwd:userPwd
    },{
        authorityAll: 1,
        userId: 1,
        userName: 1,
        userPwd: 1,
        _id: 0
    }, function (err, admin) {
        if(err){
            res.json({
                status: '0',
                msg: err.message
            })
        }else{
            if(admin){
                redis.addKey(admin.userId,admin.userName,function (redisErr,redisRes) {
                    console.log(redisRes)
                    if(redisRes === 'OK'){
                        res.json({
                            status: '1',
                            msg: '',
                            data: admin
                        });
                    }else{
                        res.json({
                            status: '0',
                            msg: '登录失败'
                        })
                    }

                })
            }else{
                res.json({
                    status: '0',
                    msg: '没有该用户'
                })
            }

        }
    })

});

// 查询管理员列表
router.get('/queryAdmin', function (req, res, next) {
    var totalCount = 0;
    var searchText = req.param("searchText");
    var pageNum = parseInt(req.param("pageNum"));
    var pageSize = parseInt(req.param("pageSize"));
    var skip = (pageNum - 1) * pageSize;

    AdminUsers.find({
        userName: new RegExp(searchText, 'i')
    }, function (err, admin) {
        if (err) {

            res.json({
                status: '0',
                msg: err.message
            })

        } else {
            totalCount = admin.length;

            AdminUsers.find({
                userName: new RegExp(searchText, 'i')
            }, {
                authorityAll: 1,
                userId: 1,
                userName: 1,
                userPwd: 1,
                _id: 0
            }).skip(skip).limit(pageSize).exec(function (err, admin) {
                if (err) {

                    res.json({
                        status: '0',
                        msg: err.message
                    })

                } else {
                    res.json({
                        status: '1',
                        msg: '',
                        totalCount: totalCount,
                        data: admin
                    })
                }
            })
        }
    });

});

//添加管理员
router.post('/addAdmin', function (req, res, next) {
    var userName = req.body.userName;
    var userPwd = req.body.userPwd;
    var userType = req.body.userType;
    if (!userName) {
        res.json({
            status: '0',
            msg: '用户名称不能为空'
        })
    }
    if (!userPwd) {
        res.json({
            status: '0',
            msg: '用户密码不能为空'
        })
    }
    if (!userType) {
        res.json({
            status: '0',
            msg: '用户类型不能为空'
        })
    }

    AdminUsers.findOne({
        userName: userName
    }, function (err, admin) {
        if (err) {
            res.json({
                status: '0',
                msg: err.message
            })
        } else {
            if (admin) {
                res.json({
                    status: '0',
                    msg: '已存在该用户'
                })
            } else {
                var userId = '875' + new Date().getTime();

                var user = {
                    userId: userId,
                    userPwd: userPwd,
                    userName: userName,
                    authorityAll: userType
                };

                AdminUsers.create(user, function (addErr, addAdmin) {
                    if (addErr) {
                        res.json({
                            status: '0',
                            msg: addErr.message
                        })
                    } else {
                        res.json({
                            status: '1',
                            msg: '添加成功'
                        })
                    }
                })

            }
        }
    })

});

// 查询管理员
router.get('/adminDetails', function (req, res, next) {
    var userId = parseInt(req.param("userId"));

    AdminUsers.findOne({
        userId: userId
    }, {
        authorityAll: 1,
        userId: 1,
        userName: 1,
        userPwd: 1,
        _id: 0
    }, function (err, admin) {
        if (err) {

            res.json({
                status: '0',
                msg: err.message
            })

        } else {

            if (admin) {
                res.json({
                    status: '1',
                    msg: '',
                    data: admin
                })
            } else {
                res.json({
                    status: '0',
                    msg: '不存在该用户'
                })
            }

        }
    });

});

//管理员信息修改
router.post('/editAdmin', function (req, res, next) {
    var userName = req.body.userName;
    var userPwd = req.body.userPwd;
    var userType = req.body.userType;
    var userId = req.body.userId;
    if (!userName) {
        res.json({
            status: '0',
            msg: '用户名称不能为空'
        })
    }
    if (!userPwd) {
        res.json({
            status: '0',
            msg: '用户密码不能为空'
        })
    }
    if (!userType) {
        res.json({
            status: '0',
            msg: '用户类型不能为空'
        })
    }

    AdminUsers.findOne({
        userId: userId
    }, function (err, admin) {
        if (err) {
            res.json({
                status: '0',
                msg: err.message
            })
        } else {
            if (admin) {
                AdminUsers.findOne({
                    userName: userName
                }, function (queryErr, queryAdmin) {
                    if (queryErr) {
                        res.json({
                            status: '0',
                            msg: queryErr.message
                        })
                    } else {
                        admin.userName = userName;
                        admin.userPwd = userPwd;
                        admin.authorityAll = userType;

                        if (queryAdmin) {
                            if(queryAdmin.userId === userId){
                                admin.save(function (editErr,editAdmin) {
                                    if (editErr) {
                                        res.json({
                                            status: '0',
                                            msg: editErr.message
                                        })
                                    } else {
                                        res.json({
                                            status: '1',
                                            msg: '修改成功'
                                        })
                                    }
                                })
                            }else{
                                res.json({
                                    status: '0',
                                    msg: '已存在该用户名称'
                                })
                            }

                        } else {
                            admin.save(function (editErr,editAdmin) {
                                if (editErr) {
                                    res.json({
                                        status: '0',
                                        msg: editErr.message
                                    })
                                } else {
                                    res.json({
                                        status: '1',
                                        msg: '修改成功'
                                    })
                                }
                            })
                        }

                    }
                })
            } else {
                res.json({
                    status: '0',
                    msg: '不已存在该用户'
                });


            }
        }
    })

});

//管理员信息删除
router.post('/delAdmin', function (req, res, next) {
    var userId = req.body.userId;

    AdminUsers.deleteOne({
        userId: userId
    }, function (err, admin) {
        if (err) {
            res.json({
                status: '0',
                msg: err.message
            })
        } else {

            if (admin) {
                res.json({
                    status: '1',
                    msg: '删除成功'
                })
            } else {
                res.json({
                    status: '0',
                    msg: '不已存在该用户'
                });

            }
        }
    })

});

module.exports = router;
