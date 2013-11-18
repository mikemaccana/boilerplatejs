// Gruntfile with the configuration of grunt-express and grunt-open. No livereload yet!
module.exports = function(grunt) {

  // Load Grunt tasks declared in the package.json file
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  // Configure Grunt
  grunt.initConfig({

    // Do less magic
    less: {
      development: {
        options: {
          paths: ["./less"],
          yuicompress: false
        },
        files: {
          "./public/css/firework.css": "./public/less/firework.less"
        }
      }
    },

    watch: {
      less: {
        files: ["./public/less/*"],
        tasks: ["less"],
        options: {
          livereload: true
        }
      }
    },

  });

};