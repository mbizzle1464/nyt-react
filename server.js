// Require Node Modules
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var logger = require('morgan'); // for debugging



// Initialize Express for debugging & body parsing
var app = express();
app.use(logger('dev'));
app.use(bodyParser.urlencoded({
  extended: false
}));


// Serve Static Content
app.use(express.static(process.cwd() + '/public'));



// Database Configuration with Mongoose
// ---------------------------------------------------------------------------------------------------------------
// Connect to localhost if not a production environment
if(process.env.NODE_ENV == 'production'){
  mongoose.connect('mongodb://heroku_wf87rtzm:99g4k0nigl2iovjsucmlh97l1l@ds237967.mlab.com:37967/heroku_wf87rtzm');
}
else{
  mongoose.connect('mongodb://localhost/nytreact');
}
var db = mongoose.connection;

// Show any Mongoose errors
db.on('error', function(err) {
  console.log('Mongoose Error: ', err);
});

// Once logged in to the db through mongoose, log a success message
db.once('open', function() {
  console.log('Mongoose connection successful.');
});

// Import the Article model
var Article = require('./models/Article.js');
// ---------------------------------------------------------------------------------------------------------------



// Import Routes/Controller
var router = require('./controllers/controller.js');
app.use('/', router);



// Launch App
var port = process.env.PORT || 3000;
app.listen(port, function(){
  console.log('Running on port: ' + port);
});