var mongoose = require('mongoose');

var candaidateschema = mongoose.Schema({
  name:String,
  email:String,
  mobileno:Number,
  github:String,
  job_id:String,
  job_name:String
});


var candidate = mongoose.model('candidate',candaidateschema);
module.exports = candidate;