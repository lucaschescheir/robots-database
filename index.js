const express = require('express');
const path = require('path');
const app = express();
const mustacheExpress = require('mustache-express');
const mongo= require('mongodb').MongoClient;

 app.use(express.static('public'));

 app.engine('mustache', mustacheExpress());

 app.set('views', './public')

 app.set('view engine', 'mustache')


mongo.connect('mongodb://localhost:27017/test', function(err, db) {
  app.get('/', function(req, res){
//get data from mongo
  db.collection('robots').find({job: {$ne: null}}).toArray().then(function (robots) {
    res.render('index', {
      names: robots,
    })
  });
});
  app.post('/', function(req, res){
    db.collection('robots').find({job: null}).toArray().then(function (robots) {
      res.render('unemployed', {
        names: robots,
      })
  })
});
app.post('/employed', function(req, res){
  db.collection('robots').find({job: {$ne: null}}).toArray().then(function (robots) {
    res.render('index', {
      names: robots,
    })
})
});
app.listen(3000, function() {
  console.log('Successfully started express application')
});
});

console.log('hello')
