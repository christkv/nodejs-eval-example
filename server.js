var mongodb = require('mongodb')
  , express = require('express')
  , format = require('util').format
  , Db = mongodb.Db
  , Server = mongodb.Server;

// Set up simple webframework
var app = express();
app.use(express.bodyParser());
app.use(express.cookieParser("some_-==+secret98_"));
app.use(express.methodOverride());
app.use(express.logger({ format: ':method :url' }));
app.use(express.cookieParser());

// Define the connection to MongoDB
var db = new Db("eval_database", new Server("localhost", 27017));

/***********************************************************************
 * Stored procedure style
 **********************************************************************/
// Set up a handler for the / route
app.get("/find", function(request, response) {
  // unpack parameters
  var id = request.param("id");

  db.eval(format(findFunction, id), function(err, item) {
    if(err) return response.end(err.message);
    if(!item) return response.end("no document found for id " + id);
    response.end(JSON.stringify(item));
  })
});

// Set up a handler for the / route
app.get("/insert", function(request, response) {
  // unpack parameters
  var id = request.param("id");
  var value = request.param("value");

  db.eval(format(insertFunction, id, value), function(err, result) {
    if(err) return response.end(err.message);
    response.end("saved document")
  })
});

// Find function
var findFunction = "db.documents.findOne({_id: %s})";
var insertFunction = "db.documents.insert({_id: %s, value: '%s'})";

/***********************************************************************
 * Better leveraging server side javascript
 **********************************************************************/
// Set up a handler for the / route
app.get("/find_better", function(request, response) {
  // unpack parameters
  var id = parseInt(request.param("id"), 10);

  // Using the driver
  db.collection("documents").findOne({_id:id}, function(err, item) {
    if(err) return response.end(err.message);
    if(!item) return response.end("no document found for id " + id);
    response.end(JSON.stringify(item));
  })
});

// Set up a handler for the / route
app.get("/insert_better", function(request, response) {
  // unpack parameters
  var id = parseInt(request.param("id"), 10);
  var value = request.param("value");

  // Using the driver
  db.collection("documents").insert({_id:id, value:value}, {safe:true}, function(err, result) {
    if(err) return response.end(err.message);
    response.end("saved document")
  })
});

// Start connection to db
db.open(function(err, result) {
  if(err) return console.dir(err);

  // Start web server
  app.listen(8080);
});