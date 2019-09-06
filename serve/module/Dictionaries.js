const mongoose = require('mongoose');

const DictionariesSchema = new mongoose.Schema({
    dictionaryCode:String, //字典代码
    dictionaryId:String, //字典id
    dictionaryName:String, //字典名称
    parentId:String, //父级id
    status:Number, //状态
});

module.exports = mongoose.model('dictionaries',DictionariesSchema);