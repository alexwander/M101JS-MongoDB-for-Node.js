var express = require('express');
var app = express();
var engines = require('consolidate');
var mongodb = require('mongodb');
var assert = require('assert');
var bodyParser = require('body-parser');

// view engine setup
app.engine('html', engines.nunjucks);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.use(bodyParser.urlencoded({ extended: true}));

// handles internal server errors
function errorHandler(error, req, res, next) {
  console.error(error.message);
  console.error(error.stack);
  res.status(500).render('error_template', {error: error});
}

// connecting MongoDB database
var uri = 'mongodb://localhost:27017/movies';
mongodb.MongoClient.connect(uri, function(error, db){
  assert.equal(null, error);
  console.log('Successfully connected to MongoDB.');

  // rendering the form
  app.get('/', function(req, res, next) {
    res.render('upload_movie', {});
  });

  // handling post request (when user clicks submit button)
  app.post('/upload_movie', function(req, res, next) {

    // storing infromation submited by user
    var title = req.body.title;
    var year = req.body.year;
    var imdb = req.body.imdb;

    if (title == '' || year == '' || imdb == ''){
      next('Please provide an entry to all fields.');
    }
    else{
      // creating movie object with data provided by user
      var movieObject = {
        'title': title,
        'year': year,
        'imdb': imdb
      };

      // inserting movieObject into MongoDB database
      db.collection('movies').insertOne(movieObject, function(error, result) {
        assert.equal(null, error);
        res.send('Document inserted with _id: ' + result.insertedId);
      });
    }

  });

  app.use(errorHandler);

  // launching express server
  var server = app.listen(3000, function() {
    var port = server.address().port;
    console.log('Express server listening on port %s', port);
  });

});
