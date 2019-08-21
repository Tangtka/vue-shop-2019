var mongoose = require('mongoose');

var settingsSchema = new mongoose.Schema({
    "configCode":String,
    "websiteName" : String,
    "websiteProfile" : String,
    "websiteKeywords" : String,
    "websiteDescription" : String,
    "websiteIcon" : String,
    "copyrightInformation" : String,
    "InternetContentProvider" : String,
    "fileServerAddress" : String
});

module.exports = mongoose.model('system_settings',settingsSchema);