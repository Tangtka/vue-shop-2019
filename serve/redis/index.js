const redis = require('redis');
const RDS_PORT = 6379;        //端口号
const RDS_HOST = '127.0.1.1';    //服务器IP
const RDS_PWD = 'tkatka';  //密码
const RDS_OPTS = {auth_pass: RDS_PWD}; //设置项
const Expiration_Time = 60 * 30; //过期时间

const client = redis.createClient(RDS_PORT, RDS_HOST, RDS_OPTS);

client.auth(RDS_PWD, function () {
    console.log('通过认证');
});

client.on('ready', function (err) {
    console.log('ready');
});


//添缓存
const addKey = (key, value, callback) => {
    client.set(key, value, callback);
    client.expire(key, Expiration_Time);
};

//存在则刷新
const findKey = (key, callback) => {
    client.get(key, (err, res) => {
        if (res !== null) {
            addKey(key, res, callback);
        } else {
            callback(err, res)
        }
    });
};

module.exports = {
    addKey: addKey,
    findKey: findKey
};
