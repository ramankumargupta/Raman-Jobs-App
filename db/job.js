var mongoose = require('mongoose');

var jobschema = mongoose.Schema({
    name:String,
    jobtype:String
});
var jobs = mongoose.model('job',jobschema);
module.exports = jobs;