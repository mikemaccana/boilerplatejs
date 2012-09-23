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
    var template_data = [
      {
        title:'Boy Meets Girl Meets Toaster',
        vendor:'Asda',
        date:'2012-07-09 04:28:54',
        item:'Nokia 100 Mobile Phone - Vodafone',
        author:'Jane',
        location:'Lancashire',
        link:'http://direct.asda.com/Nokia-100-Mobile-Phone---Vodafone/008718298,default,pd.html',
        content:'This is the phone for you if you really do just want a <h4>decent basic mobile phone</h4> rather than a <h6>portable office/</h6><h5>music studio/</h5><h5>cinema/</h5><h4>British library/</h4><h5>missile tracking system/</h5><h4>hadron collider/</h4><h6>bat detector/</h6><h5>trading floor/</h5><h5>muffin tin/<h5></h6>paperweight</h6>.',
        tags:['love','bizarre'],
        font:'TheanoDidotRegular',
        product_first:false
      },
      {
        title:'Boy Meets Girl Meets Toaster',
        vendor:'Homebase',
        date:'2012-07-04 09:08:16',
        item:'Green Twine - 60m',
        author:'Unnamed',
        location:'Woking',
        link:'http://www.homebase.co.uk/webapp/wcs/stores/servlet/ProductDisplay?langId=110&storeId=10151&partNumber=829850',
        content:'If you want string, <h4>this is string,</h4> if you want a frying pan <h4>this is not a frying pan...</h4><h6>only use this as string to tie things together, or things to other things.</h6><h6>Will not work if using to cook bacon...</h6> <h5>If you\'re still not sure of what this does or whether it is fit for purpose then you need to seek help,<h5><h6> not for further clarification but for yourself...</h6>',
        tags:['ronseal','bizarre'],
        font:'BloklettersPotlood',
        product_first:false
      }
    ]
    console.log('Server running on port 3000')
    utils.respondWithTemplate(response, 'hello', template_data[0])
  });

  app.listen(3000);
})