var express = require('express');
var router = express.Router();
const AdminUsers = require('../models/AdminUsers.js');
const Users = require('../models/Users.js');
const tool = require('../utils/tool.js');

/*
* 查询用户列表
* */
router.post('/list', function (req, res, next) {
    let accountType = req.body.accountType,
        pageNum = parseInt(req.body.pageNum),
        pageSize = parseInt(req.body.pageSize),
        adminUsers = null,
        users = null;
    if (!accountType) {
        res.json({
            status: 0,
            message: 'accountType 不能为空',
            result: {}
        })
    }
    switch (accountType) {
        case '1':
        case '2':
            adminUsers = AdminUsers.find({
                $or: [{accountType:1},{accountType:2}],
                status: 1
            }, {
                _id: 0,
                __v: 0
            });
            adminUsers.sort({createTime: -1});
            adminUsers.skip((pageNum - 1) * pageSize);
            adminUsers.limit(pageSize);

            AdminUsers.count({
                $or: [{accountType:1},{accountType:2}],
                status: 1
            }, (err, count) => {
                if (err) {
                    res.json({
                        status: 0,
                        message: err,
                        result: {}
                    })
                }
                adminUsers.exec((err, users) => {
                    if (err) {
                        res.json({
                            status: 0,
                            message: err,
                            result: {}
                        })
                    }
                    res.json({
                        status: 1,
                        message: '查询成功',
                        pageCount: count,
                        result: users,
                    })
                });
            });
            break;
        case '3':
            users = Users.find({
                accountType,
                status: 1
            }, {
                _id: 0,
                __v: 0
            });
            users.sort({createTime: -1});
            users.skip((pageNum - 1) * pageSize);
            users.limit(pageSize);

            Users.count({
                accountType,
                status: 1
            }, (err, count) => {
                if (err) {
                    res.json({
                        status: 0,
                        message: err,
                        result: {}
                    })
                }
                users.exec((err, users) => {
                    if (err) {
                        res.json({
                            status: 0,
                            message: err,
                            result: {}
                        })
                    }
                    res.json({
                        status: 1,
                        message: '查询成功',
                        pageCount: count,
                        result: users,
                    })
                });
            });
            break;
    }
});

/*
* 添加用户
* */
router.post('/add', function (req, res, next) {
    let params = {
        userId: 'u' + tool.getRandom(),
        userName: req.body.userName,
        userPwd: req.body.userPwd,
        accountType: req.body.accountType,
        accountTypeName: req.body.accountTypeName,
        mobile: req.body.mobile,
        createTime: tool.dateFormat(new Date(), 'yyyy-MM-dd hh:mm:ss'),
        updateTime: tool.dateFormat(new Date(), 'yyyy-MM-dd hh:mm:ss'),
        status: 1
    };

    if (!params.accountType) {
        res.json({
            status: 0,
            message: 'accountType 不能为空',
            result: {}
        })
    }
    switch (params.accountType) {
        case '1':
        case '2':
            AdminUsers.findOne({
                userName: params.userName,
                status: 1,
            }, (err, user) => {
                if (err) {
                    res.json({
                        status: 0,
                        message: err,
                        result: {}
                    })
                }

                if (user) {
                    res.json({
                        status: 0,
                        message: '用户名重复',
                        result: {},
                    })
                } else {
                    AdminUsers.create(params, (addErr, addUser) => {
                        if (addErr) {
                            res.json({
                                status: 0,
                                message: addErr,
                                result: {}
                            })
                        } else {
                            res.json({
                                status: 1,
                                message: '添加成功',
                                result: {}
                            })
                        }
                    })
                }
            });
            break;
        case '3':
            Users.findOne({
                userName: params.userName,
                status: 1,
            }, (err, user) => {
                if (err) {
                    res.json({
                        status: 0,
                        message: err,
                        result: {}
                    })
                }

                if (user) {
                    res.json({
                        status: 0,
                        message: '用户名重复',
                        result: {},
                    })
                } else {
                    Users.create(params, (addErr, addUser) => {
                        if (addErr) {
                            res.json({
                                status: 0,
                                message: addErr,
                                result: {}
                            })
                        } else {
                            res.json({
                                status: 1,
                                message: '添加成功',
                                result: {}
                            })
                        }
                    })
                }
            });
            break;
    }

});

/*
* 修改用户信息
* */
router.post('/edit', function (req, res, next) {
    let params = {
        userId: req.body.userId,
        userName: req.body.userName,
        userPwd: req.body.userPwd,
        accountType: req.body.accountType,
        accountTypeName: req.body.accountTypeName,
        mobile: req.body.mobile,
        updateTime: tool.dateFormat(new Date(), 'yyyy-MM-dd hh:mm:ss'),
        status: 1
    };

    if (!params.accountType) {
        res.json({
            status: 0,
            message: 'accountType 不能为空',
            result: {}
        })
    }
    switch (params.accountType) {
        case '1':
        case '2':
            AdminUsers.findOneAndUpdate({
                userId: params.userId,
                status: 1,
            }, {
                userName: params.userName,
                userPwd: params.userPwd,
                accountType: params.accountType,
                accountTypeName: params.accountTypeName,
                mobile: params.mobile,
                updateTime: params.updateTime,
            }, (err, user) => {
                if (err) {
                    res.json({
                        status: 0,
                        message: err,
                        result: {}
                    })
                }
                if (user) {
                    res.json({
                        status: 1,
                        message: '修改成功',
                        result: {}
                    })
                } else {
                    res.json({
                        status: 0,
                        message: '查询不到该用户',
                        result: {}
                    })
                }
            });
            break;
        case '3':
            Users.findOneAndUpdate({
                userId: params.userId,
                status: 1,
            }, {
                userName: params.userName,
                userPwd: params.userPwd,
                accountType: params.accountType,
                accountTypeName: params.accountTypeName,
                mobile: params.mobile,
                updateTime: params.updateTime,
            }, (err, user) => {
                if (err) {
                    res.json({
                        status: 0,
                        message: err,
                        result: {}
                    })
                }
                if (user) {
                    res.json({
                        status: 1,
                        message: '修改成功',
                        result: {}
                    })
                } else {
                    res.json({
                        status: 0,
                        message: '查询不到该用户',
                        result: {}
                    })
                }
            });
            break;
    }

});

/*
* 删除用户信息
* */
router.post('/del', function (req, res, next) {
    let userId = req.body.userId,
        accountType = req.body.accountType;

    if (!accountType) {
        res.json({
            status: 0,
            message: 'accountType 不能为空',
            result: {}
        })
    }
    switch (accountType) {
        case '1':
        case '2':
            AdminUsers.findOneAndUpdate({
                userId,
                status: 1,
            }, {
                status: 0
            }, (err, user) => {
                if (err) {
                    res.json({
                        status: 0,
                        message: err,
                        result: {}
                    })
                }
                if (user) {
                    res.json({
                        status: 1,
                        message: '删除成功',
                        result: {}
                    })
                } else {
                    res.json({
                        status: 0,
                        message: '查询不到该用户',
                        result: {}
                    })
                }
            });
            break;
        case '3':
            Users.findOneAndUpdate({
                userId,
                status: 1,
            }, {
                status: 0
            }, (err, user) => {
                if (err) {
                    res.json({
                        status: 0,
                        message: err,
                        result: {}
                    })
                }
                if (user) {
                    res.json({
                        status: 1,
                        message: '删除成功',
                        result: {}
                    })
                } else {
                    res.json({
                        status: 0,
                        message: '查询不到该用户',
                        result: {}
                    })
                }
            });
            break;
    }

});

/*
* 查询单个用户信息
* */
router.post('/findOne', function (req, res, next) {
    let userId = req.body.userId,
        accountType = req.body.accountType;

    if (!accountType) {
        res.json({
            status: 0,
            message: 'accountType 不能为空',
            result: {}
        })
    }
    switch (accountType) {
        case '1':
        case '2':
            AdminUsers.findOne({
                userId,
                status: 1,
            }, {
                _id: 0,
                __v: 0
            }, (err, user) => {
                if (err) {
                    res.json({
                        status: 0,
                        message: err,
                        result: {}
                    })
                }
                if (!user) {
                    res.json({
                        status: 0,
                        message: '没有当前用户ID',
                        result: {}
                    })
                } else {
                    res.json({
                        status: 1,
                        message: '查询成功',
                        result: user
                    })
                }
            });
            break;
        case '3':
            Users.findOne({
                userId,
                status: 1,
            }, {
                _id: 0,
                __v: 0
            }, (err, user) => {
                if (err) {
                    res.json({
                        status: 0,
                        message: err,
                        result: {}
                    })
                }
                if (!user) {
                    res.json({
                        status: 0,
                        message: '没有当前用户ID',
                        result: {}
                    })
                } else {
                    res.json({
                        status: 1,
                        message: '查询成功',
                        result: user
                    })
                }
            });
            break;
    }

});


/*
* 登录
* */
router.post('/login', function (req, res, next) {
    let userName = req.body.userName,
        userPwd = req.body.userPwd;

    AdminUsers.findOne({
        userName,
        status: 1,
    }, {
        _id: 0,
        __v: 0
    }, (err, user) => {
        if (err) {
            res.json({
                status: 0,
                message: err,
                result: {}
            })
        }
        if (!user) {
            res.json({
                status: 0,
                message: '没有当前用户',
                result: {}
            })
        } else {
            AdminUsers.findOne({
                userName,
                userPwd,
                status: 1,
            }, {
                _id: 0,
                __v: 0
            }, (err1, user1) => {
                if (err1) {
                    res.json({
                        status: 0,
                        message: err1,
                        result: {}
                    })
                }
                if(!user1){
                    res.json({
                        status: 0,
                        message: '密码错误',
                        result: {}
                    })
                }else{
                    res.json({
                        status: 1,
                        message: '登录成功',
                        result: user1
                    })
                }

            });
        }
    });

});


module.exports = router;
