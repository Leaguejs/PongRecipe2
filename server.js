// server.js
// where your node app starts

// init
// setup express for handling http requests
var express = require("express");
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static('public')); // http://expressjs.com/en/starter/static-files.html
var connected=false;
app.listen(3000);
console.log('Listening on port 3000');

// setup nunjucks for templating in views/index.html
var nunjucks = require('nunjucks');
nunjucks.configure('views', { autoescape: true, express: app });

// setup our datastore
var datastore = require("./datastore").async;

// initial data
var scores = [
    {
      name: "Anon",
      score: "10"
    }, {
      name: "Duder",
      score: "23"
    }
];

// routes (using Express)

// Render the root page, with the contents of `views/index.html`
app.get('/', function(request, response) {
  getConnected() // Check we have a database connection
  .then(function(){
        response.render('index.html', {
          title: "Pong Solo",
          scores: scores
        });
  })
  .catch(function (err) {
    response.json(err);
  });  
});

// Store the POSTed user score
app.post('/scores', function(request, response) {
  scores.push(request.body);
      
  datastore.set("scores", scores)
  .then(function(){
    return scores;
  })
  .catch(function (err) {
    console.log(err);
  });  
});
    
function getConnected() {
  return new Promise(function (resolving) {
    if(!connected){
      connected = datastore.connect().then(function(){
        resolving();
      });
    } else {
      resolving();
    }
  });
}    