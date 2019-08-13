var mongoose = require('mongoose');

var adminSchema = new mongoose.Schema({
    "userId" : String,
    "userName" : String,
    "userPwd" : String,
    "authorityAll" : String
});

module.exports = mongoose.model('admin-user',adminSchema);