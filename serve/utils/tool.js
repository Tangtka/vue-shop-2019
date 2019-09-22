const Log = require('../models/Logs.js');

/*
* 返回随机数
* 时间戳+5位随机数
* */
const getRandom = () => {
    return new Date().getTime() + Math.floor(Math.random() * 99999 + 10000);
};

/*
* 处理时间
* */
const dateFormat = (fmt, date) => {
    let o = {
        "M+": date.getMonth() + 1,     //月份
        "d+": date.getDate(),     //日
        "h+": date.getHours(),     //小时
        "m+": date.getMinutes(),     //分
        "s+": date.getSeconds(),     //秒
        "q+": Math.floor((date.getMonth() + 3) / 3), //季度
        "S": date.getMilliseconds()    //毫秒
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
};

/*
* 添加操作记录
* params @Object
* */
const addlog = (params) => {
    let logParam = {
        logId: 'log' + getRandom(),
        createTime: dateFormat('yyyy-MM-dd hh:mm:ss', new Date()),
        operationContent: params.operationContent,
        userId: params.userId,
        userName: params.userName,
        browser: params.browser,
        status: 1
    };



};

module.exports = {
    getRandom,
    dateFormat,
    addlog
};