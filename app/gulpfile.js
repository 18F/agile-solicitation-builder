var gulp = require('gulp');
var browserify = require('browserify');
var reactify = require('reactify');
var watchify = require('watchify');
var source = require('vinyl-source-stream');
var rename = require('gulp-rename');
var notify = require("gulp-notify");

function handleErrors() {
  var args = Array.prototype.slice.call(arguments);
  notify.onError({
    title: "Compile Error",
    message: "<%= error.message %>"
  }).apply(this, args);
  this.emit('end'); // Keep gulp from hanging on this task
}

gulp.task('copyjquery', function(){
  gulp.src('./node_modules/jquery/dist/jquery.min.js').pipe(gulp.dest('./build'));
});

var bundler = browserify({
        entries: ['./src/app.js'], // Only need initial file, browserify finds the deps
        transform: [reactify], // We want to convert JSX to normal javascript
        debug: true, // Gives us sourcemapping
        cache: {}, packageCache: {}, fullPaths: true // Requirement of watchify
    });

gulp.task('bundling', function(){
  bundler
  .bundle()
  .pipe(source('./src/app.js'))
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
  		    	.pipe(rename('bundle.js'))
  		    	.pipe(gulp.dest('./build'));
  	        console.log('Updated!', (Date.now() - updateStart) + 'ms');
  	    })
  	    .bundle() // Create the initial bundle when starting the task
  	    .on('error', handleErrors)
  	    .pipe(source('./src/app.js'))
        // .pipe(buffer())
        // .pipe(uglify())
      	.pipe(rename('bundle.js'))
      	.pipe(gulp.dest('./build'));
});

gulp.task('default', ['bundlingWatch'], function() {
  gulp.watch('./src/**/*.js', function(){
    gulp.run('bundling');
  });
});

gulp.task('build', ['bundling', 'copyjquery'], function(){});
