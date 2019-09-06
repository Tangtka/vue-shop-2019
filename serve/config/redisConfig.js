const redis = require('redis');
const RDS_PORT = 6379;        //端口号
const RDS_HOST = 'pegasus.org.cn';    //服务器IP
const RDS_PWD = 'tkatka875';  //密码
const RDS_OPTS = {auth_pass: RDS_PWD}; //设置项
const Expiration_Time = 60 * 30; //过期时间

const client = redis.createClient(RDS_PORT, RDS_HOST, RDS_OPTS);

client.auth(RDS_PWD, function () {
    console.log('通过认证');
});

client.on('ready', function (err) {
    console.log('ready');
});

module.exports = {
    client,
    Expiration_Time
};
