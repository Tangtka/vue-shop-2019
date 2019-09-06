const Log = require('./../module/Log.js');
const tool = require('./../utils/tool.js');

const addLog = (param) => {
    let logParam = {
        logId: 'log' + tool.getRandom(),
        createTime: tool.dateFormat('yyyy-MM-dd hh:mm:ss', new Date()),
        operationContent: param.operationContent,
        userId: param.userId,
        userName: param.userName,
        browser: param.browser,
        status: 1
    }

};

addLog({
    operationContent:'operationContent',
    userId:'userId',
    userName:'userName',
    browser:'browser'
});
/*
models.extends = {
    addLog
};
*/