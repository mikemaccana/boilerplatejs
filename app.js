#!/usr/bin/env node
/*jshint asi:true */ 

// Modules
var requirejs = require('requirejs');
requirejs.config({ nodeRequire: require, baseUrl: "lib" });

requirejs(['express', 'utils', 'fs', './public/js/lib/agave.js'], function (express, utils, fs, agave) {
  
  var REVIEWS_FILE = 'reviews.json'
  
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
  
  // Load our reviews
  fs.readFile(REVIEWS_FILE, 'utf-8', function(err, review_data){
    var reviews = JSON.parse(review_data);

    // Overall view
    app.get('/', function(request, response){
      console.log('Server running on port 3000')
      utils.respondWithTemplate(response, 'site', reviews[0])
    });    
  
    // Individual page view
    app.get("/:review_slug", function(req, res) {    
     var review_slug = req.params.review_slug;
     var review = reviews.findItem(function(item){
       return item.slug = review_slug;
     })     
     utils.respondWithTemplate(response, 'site', review)
    })
     
    // Admin view
    app.get('/admin', function(request, response){
      response.end('admin goes here');
    })


    app.listen(3000);    
  })
  

})