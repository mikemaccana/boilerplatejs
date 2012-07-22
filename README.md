# boilerplate.js

A template for full-stack Javascript apps

 * A filled out package.json
 * Shared code between the server and the browser out of the box
 * Async, script-tag free JS looading on the client
 * A config file, with common related utilities to prompt for passwords and expand home dirs
 * Mustache templating, LESS.CSS
 
License MIT

### Installing Boilerplate JS

Assuming you've already got node installed, run:

	npm install .

### What's with this 'less' stuff?

boilerplate.js uses less for CSS variables etc. You can regenerate the .CSS files with:
    
    lessc -x public/less/boilerplate.less > public/css/boilerplate.css 
