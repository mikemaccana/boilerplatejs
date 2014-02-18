// Run 'gulp' to do the important stuff
var gulp = require('gulp'),
  prefixer = require('gulp-autoprefixer'),
  sass = require('gulp-sass'),
  livereload = require('gulp-livereload'),
  nodemon = require('gulp-nodemon'),
  jshint = require('gulp-jshint'),
  livereloadServer = require('tiny-lr')()

var path = require('path');


gulp.task('sass', function () {
  gulp
    .src('./public/scss/*.scss')
    .pipe(sass())
    .pipe(prefixer('last 2 versions', 'ie 9'))
    .pipe(gulp.dest('./public/css'))
    .pipe(livereload(livereloadServer));
});

// The default task (called when you run `gulp`)
gulp.task('default', function() {
  gulp.run('sass');
  nodemon({ script: 'server.js', options: '--watch lib --watch views --watch server.js --ext js,handlebars' })
  livereloadServer.listen(35729, function (err) {
    if (err) return console.log(err);

    // Watch files and run tasks if they change
    gulp.watch('./public/scss/*.scss', function(event) {
      gulp.run('sass');
    });
  });
});

