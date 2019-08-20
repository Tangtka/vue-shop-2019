var express = require('express');
var router = express.Router();
var Users = require('../models/Users.js');
// var redis = require('../redis/index.js');

var displayField={
    userId: 1,
    userName: 1,
    userPwd: 1,
    authorityAll: 1,
    _id: 0
};

// 查询用户列表
router.get('/queryUsers', function (req, res, next) {
    var totalCount = 0;
    var searchText = req.param("searchText");
    var pageNum = parseInt(req.param("pageNum"));
    var pageSize = parseInt(req.param("pageSize"));
    var skip = (pageNum - 1) * pageSize;

    Users.find({
        userName: new RegExp(searchText, 'i')
    }, function (err, users) {
        if (err) {

            res.json({
                status: '0',
                msg: err.message
            })

        } else {
            totalCount = users.length;

            Users.find({
                userName: new RegExp(searchText, 'i')
            }, displayField).skip(skip).limit(pageSize).exec(function (userErr, userData) {
                if (userErr) {

                    res.json({
                        status: '0',
                        msg: userErr.message
                    })

                } else {
                    res.json({
                        status: '1',
                        msg: '',
                        totalCount: totalCount,
                        data: userData
                    })
                }
            })
        }
    });

});

//添加用户
router.post('/addUsers', function (req, res, next) {
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

    Users.findOne({
        userName: userName
    }, function (err, user) {
        if (err) {
            res.json({
                status: '0',
                msg: err.message
            })
        } else {
            if (user) {
                res.json({
                    status: '0',
                    msg: '已存在该用户'
                })
            } else {
                var userId = '875' + new Date().getTime();

                var userInfo = {
                    userId: userId,
                    userPwd: userPwd,
                    userName: userName,
                    authorityAll:userType
                };

                Users.create(userInfo, function (addErr, addUser) {
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

// 查询用户
router.get('/UsersDetails', function (req, res, next) {
    var userId = parseInt(req.param("userId"));

    Users.findOne({
        userId: userId
    }, displayField, function (err, user) {
        if (err) {

            res.json({
                status: '0',
                msg: err.message
            })

        } else {

            if (user) {
                res.json({
                    status: '1',
                    msg: '',
                    data: user
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

//用户信息修改
router.post('/editUsers', function (req, res, next) {
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

    Users.findOne({
        userId: userId
    }, function (err, user) {
        if (err) {
            res.json({
                status: '0',
                msg: err.message
            })
        } else {
            if (user) {
                Users.findOne({
                    userName: userName
                }, function (queryErr, queryUser) {
                    if (queryErr) {
                        res.json({
                            status: '0',
                            msg: queryErr.message
                        })
                    } else {
                        user.userName = userName;
                        user.userPwd = userPwd;
                        user.authorityAll = userType;

                        if (queryUser) {
                            if(queryUser.userId === userId){
                                user.save(function (editErr,editUser) {
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
                            user.save(function (editErr,editAdmin) {
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

//用户信息删除
router.post('/delUsers', function (req, res, next) {
    var userId = req.body.userId;

    Users.deleteOne({
        userId: userId
    }, function (err, user) {
        if (err) {
            res.json({
                status: '0',
                msg: err.message
            })
        } else {

            if (user) {
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
