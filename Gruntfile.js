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
          "./public/css/boilerplate.css": "./public/less/boilerplate.less"
        }
      }
    },

    // Automatically add prefixes for browsers
    autoprefixer: {
      options: {
        browsers: ['last 2 version', 'ie 9']
      },
      development: {
        expand: true,
        flatten: true,
        src: 'public/css/*.css',
        dest: 'public/css'
      }
    },

    watch: {
      less: {
        files: ["./public/less/*"],
        tasks: ["less", "autoprefixer:development"],
        options: {
          livereload: true
        }
      }
    },

  });

};