'use strict';

/*
 * A simple Node.js program for exporting the current working directory via a webserver listing
 * on a hard code (see portno below) port. To start the webserver run the command:
 *    node webServer.js
 *
 * Note that anyone able to connect to localhost:3001 will be able to fetch any file accessible
 * to the current user in the current directory or any of its children.
 */

/* jshint node: true */

var express = require('express');

var portno = 3000;   // Port number to use

var app = express();

// start mongodb
const MongoClient = require('mongodb').MongoClient

var db;
const URL = "mongodb+srv://artur:Ra19271996@sigma-msxb2.mongodb.net/test?retryWrites=true&w=majority";
MongoClient.connect(URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, 
(err, client) => {
  if (err) return console.log(err);
  db = client.db('sigma')

  app.use(express.static(__dirname));

  app.get('/', function (request, response) {
    response.send('Simple web server of files from ' + __dirname);
  });

  app.get('/getScript/:ID', (request, response) => {
    var paramID = request.params.ID;
    const collection = db.collection('scripts');
    collection.findOne({ID: paramID}, (err, script) => {
      if(err) return console.log ("error in API");
      if(script){
        response.status(200);
        response.send(script);
      } else {
        response.status(404);
        response.send("Nothing found.");
      }
    });
    return;
  });

  var server = app.listen(portno, () => {
    var port = server.address().port;
    console.log('Listening at http://localhost:' + port + ' exporting the directory ' + __dirname);
  });
});

