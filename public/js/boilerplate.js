requirejs.config({
  // By default load any module IDs from public/js/lib
  baseUrl: 'public/js/lib'
});

requirejs(["agave"], function(agave) {
  agave.enable('av');
  var $ = function(selector) { return document.querySelector(selector) };
  var $all = function(selector) { return document.querySelectorAll(selector) };

  // Clicking ☰ button displays nav
  $('.nav-link').addEventListener('click', function (event) {
    $all('nav, body').avforEach(function(element){
      element.avtoggleClass('menu-active');
    });
    event.preventDefault();
  });
});



