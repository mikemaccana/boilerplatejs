#!/usr/bin/env node
/*jshint asi:true */ 

// Modules
var requirejs = require('requirejs');
requirejs.config({ nodeRequire: require, baseUrl: "lib" });

requirejs(['express', 'utils', './public/js/lib/shared.js',], function (express, utils, shared) {
  var app = express.createServer();
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
      content:'Welcome to Boilerplate JS',
      features:[
        'A filled out package.json',
        'Shared code between the server and the browser out of the box',
        'Async, script-tag free JS looading on the client',
        'A config file, with common related utilities to prompt for passwords and expand home dirs',
        'Mustache templating, LESS.CSS'
      ]
    }
    utils.respondWithTemplate(response, 'hello', template_data)
  });

  app.listen(3000);
})