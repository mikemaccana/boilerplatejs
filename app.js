#!/usr/bin/env node
// Modules
var requirejs = require('requirejs');
requirejs.config({ nodeRequire: require, baseUrl: "lib" });

requirejs(['express', 'utils', './public/js/lib/shared.js',], function (express, utils, shared) {
  var PORT = 3000;
  var app = express();
  app.configure(function(){
    app.use(express.methodOverride()); // Allow browsers to simulate PUT etc.
    app.use(express.bodyParser()); // Support POST form bodies. Why would someone ever *not* want this?
    // 'express.static' causes jshint warning (static is reserved word).
    app.use('/public', express['static']('public'));
    app.use(express.errorHandler({
      dumpExceptions: true,
      showStack: true
    }));
    app.use(app.router);
  });

  app.get('/', function(request, response){
    // response.send('Hello World');
    var template_data = {
      title:'Boilerplate JS',
      content:'This is a sample web page.'
    }
    utils.respondWithTemplate(response, 'hello', template_data)
  });

  app.listen(PORT);
  console.log('App is now running on', PORT);
})