var gulp = require('gulp');
var browserify = require('browserify');
var reactify = require('reactify');
var watchify = require('watchify');
var uglify = require('gulp-uglify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var rename = require('gulp-rename');
var notify = require("gulp-notify");
// var jshint = require('gulp-jshint');
var gutil = require('gulp-util');
var eslint = require('gulp-eslint');
var stylelint = require('@18f/stylelint-rules');
var sass = require('gulp-sass');

function handleErrors() {
  var args = Array.prototype.slice.call(arguments);
  notify.onError({
    title: "Compile Error",
    message: "<%= error.message %>"
  }).apply(this, args);
  this.emit('end'); // Keep gulp from hanging on this task
}

gulp.task('copyjsanduswds', function(){
  gulp.src('./node_modules/jquery/dist/jquery.min.js').pipe(gulp.dest('./build'));
  gulp.src(['./node_modules/uswds/dist/**/*', ]).pipe(gulp.dest('./assets/'))

});

var bundler = browserify({
        entries: ['./src/app.js'], // Only need initial file, browserify finds the deps
        transform: [reactify], // We want to convert JSX to normal javascript
        debug: true, // Gives us sourcemapping
        cache: {}, packageCache: {}, fullPaths: false // Requirement of watchify
    });

gulp.task('bundling', function(){
  bundler
  .bundle()
  .pipe(source('./src/app.js'))
  .pipe(eslint({
      baseConfig: {
        "ecmaFeatures": {
           "jsx": true
         }
      }
    }))
  .pipe(eslint.format())
  // .pipe(eslint.failAfterError())
  .pipe(buffer()) // <----- convert from streaming to buffered vinyl file object
  .pipe(uglify().on('error', gutil.log))
  .pipe(rename('bundle.js'))
  .pipe(gulp.dest('./build'));
});

gulp.task('bundlingWatch', function () {
  	var watcher  = watchify(bundler);

      return watcher
  	    .on('update', function () { // When any files update
  	        var updateStart = Date.now();
  	        console.log('Updating!');

  	        watcher.bundle() // Create new bundle that uses the cache for high performance
  	        	.on('error', handleErrors)
  	        	.pipe(source('./src/app.js'))
              .pipe(eslint({
                  baseConfig: {
                    "ecmaFeatures": {
                       "jsx": true
                     }
                  }
                }))
              .pipe(eslint.format())
              // .pipe(eslint.failAfterError())
              .pipe(buffer()) // <----- convert from streaming to buffered vinyl file object
              .pipe(uglify().on('error', gutil.log))
  		    	.pipe(rename('bundle.js'))
  		    	.pipe(gulp.dest('./build'));
  	        console.log('Updated!', (Date.now() - updateStart) + 'ms');
  	    })
  	    .bundle() // Create the initial bundle when starting the task
  	    .on('error', handleErrors)
  	    .pipe(source('./src/app.js'))
        .pipe(eslint({
            baseConfig: {
              "ecmaFeatures": {
                 "jsx": true
               }
            }
          }))
        .pipe(eslint.format())
        // .pipe(eslint.failAfterError())
        .pipe(buffer()) // <----- convert from streaming to buffered vinyl file object
        .pipe(uglify().on('error', gutil.log))
      	.pipe(rename('bundle.js'))
      	.pipe(gulp.dest('./build'));
});

var lintFunction = stylelint('./assets/css/**/*.scss', {});

gulp.task('scssLint', lintFunction);

gulp.task('sass', function(){
  return gulp.src('./assets/css/**/*.scss')
    .pipe(sass()) // Using gulp-sass
    .pipe(gulp.dest('./assets/css'))
});

gulp.task('watch', ['bundlingWatch', 'copyjsanduswds', 'scssLint', 'sass'], function() {
  gulp.watch('./src/**/*.js', function(){
    gulp.run('bundling');
  });
});

gulp.task('default', ['bundling', 'copyjsanduswds', 'scssLint', 'sass'], function(){});
