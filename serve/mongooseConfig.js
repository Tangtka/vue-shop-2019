var mongoose = require('mongoose');

//连接mongoDB 数据库
mongoose.connect('mongodb://xxx.org.cn:27017/vue_shop');
mongoose.connection.on('connected', function () {
    console.log('连接成功...')
});
mongoose.connection.on('error', function () {
    console.log('连接失败...')
});
mongoose.connection.on('disconnected', function () {
    console.log('断开连接...')
});
