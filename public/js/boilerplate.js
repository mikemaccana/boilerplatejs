requirejs.config({
  // By default load any module IDs from public/js/lib
  baseUrl: 'public/js/lib'
});

requirejs(["jquery", "underscore"], function($, _) {
  
  $(function() { 
    console.log('Hello there')
  })
})  
