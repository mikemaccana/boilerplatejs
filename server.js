#!/usr/bin/env node
// Modules
var requirejs = require('requirejs');
requirejs.config({ nodeRequire: require, baseUrl: "lib" });

requirejs(['express', 'express3-handlebars', 'utils', './public/js/lib/shared.js'],
  function (express, expressHandlebars, utils, shared) {

  var PORT = process.env.PORT || 3000;
  var app = express();

  global.log = console.log.bind(console); // Save some typing

  // use handlebars templating
  app.engine('handlebars', expressHandlebars({
    defaultLayout: 'main' // This layout is the html5 layout
  }));
  app.enable('view cache'); // Cache templates

  app.configure(function(){
    app.set('port', PORT);
    app.set('views', __dirname + '/views');
    app.set('view engine', 'handlebars');
    app.use(express.methodOverride()); // Allow browsers to simulate PUT etc.
    app.use(express.bodyParser()); // Support POST form bodies. Why would someone ever *not* want this?
    app.use('/public', express.static('public'));
    app.use(express.errorHandler({
      dumpExceptions: true,
      showStack: true
    }));
    app.use(app.router);
  });

  app.get('/', function(request, response){
    // response.send('Hello World');
    var templateData = {
      title:'Boilerplate JS',
      content:'This is a sample web page.'
    }
    utils.respondWithTemplate(response, 'hello', {}, templateData)
  });

  app.listen(PORT);
  console.log('App is now running on', PORT);
})