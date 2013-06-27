#!/usr/bin/env node
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
      title:'Boy Meets Girl Meets Toaster',
      vendor:'Asda',
      date:'2012-07-09 04:28:54',
      item:'Nokia 100 Mobile Phone - Vodafone',
      author:'Jane',
      location:'Lancashire',
      link:'http://direct.asda.com/Nokia-100-Mobile-Phone---Vodafone/008718298,default,pd.html',
      content:'This is the phone for you if you really do just want a <h4>decent basic mobile phone</h4> rather than a <h6>portable office/</h6><h5>music studio/</h5><h5>cinema/</h5><h4>British library/</h4><h5>missile tracking system/</h5><h4>hadron collider/</h4><h6>bat detector/</h6><h5>trading floor/</h5><h5>muffin tin/<h5></h6>paperweight</h6>.'
    }
    utils.respondWithTemplate(response, 'hello', template_data)
  });

  app.listen(3000);
})