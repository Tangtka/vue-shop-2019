var mongoose = require('mongoose');

//连接mongoDB 数据库
mongoose.connect('mongodb://pegasus.org.cn:27017/tka_shop');
mongoose.connection.on('connected', function () {
    console.log('mongodb连接成功...')
});
mongoose.connection.on('error', function () {
    console.log('mongodb连接失败...')
});
mongoose.connection.on('disconnected', function () {
    console.log('mongodb断开连接...')
});
