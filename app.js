
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var mongoose = require('mongoose');

var candidates = require('./db/candidate');
var jobs = require('./db/job');
 


var app = express();
mongoose.connect('mongodb://localhost/carrer');
//mongoose.connect('mongodb://<sonu>:<sonu1234>@ds031893.mongolab.com:31893/datastore');

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}


app.get('/users', user.list);

app.get('/candidates', function(req,res){
  candidates.find({}, function(err,docs){
    if(!err) res.json(docs)
    else res.send(500);
  });
});

app.get('/candidates/:id', function(req, res) {
  candidates.findById(req.params.id, function(err, doc) {
    if(!err) res.json(200, doc);
    else res.send(500);
  });
});

app.post('/candidates/submit',function(req,res) {
   var candidate = new candidates(req.body);

  candidate.save(function(err){
    if(!err) res.redirect('/');
    else res.send(500);
  });
});

app.delete('/candidate/:id', function(req, res) {
  candidates.findByIdAndRemove(req.params.id, function(err, doc) {
    if(!err) {
      candidates.find({}, function(err,doc){
        if(!err) res.json(doc)
        else res.send(500);

      })
    }
  });
});


app.get('/jobs', function(req,res){
  jobs.find({}, function(err,docs){
    if(!err) res.json(docs)
    else res.send(500);
  });
});

app.get('/jobs/:id', function(req, res) {
  jobs.findById(req.params.id, function(err, doc) {
    if(!err) res.json(200, doc);
    else res.send(500);
  });
});

app.post('/jobs/submit',function(req,res) {
  var job = new jobs(req.body);

  job.save(function(err){
    if(!err) res.redirect('/job.html');
    else res.send(500);
  });
});

app.delete('/job/:id', function(req, res) {
  jobs.findByIdAndRemove(req.params.id, function(err, doc) {
    if(!err) {
      jobs.find({}, function(err,doc){
        if(!err) res.json(doc)
        else res.send(500);

      })
    }
  });
});
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
