// import {client} from './../config/redisConfig.js'
const redis = require('./../config/redisConfig.js');
const client = redis.client;
const Expiration_Time = redis.Expiration_Time;
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
