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

gulp.task('copy_jquery', function(){
  gulp.source('bower_components/jquery/dist/jquery.min.js').pipe(ulp.dest('./build'));
});
gulp.task('default', function() {
    var bundler = browserify({
        entries: ['./src/app.js'], // Only need initial file, browserify finds the deps
        transform: [reactify], // We want to convert JSX to normal javascript
        debug: true, // Gives us sourcemapping
        cache: {}, packageCache: {}, fullPaths: true // Requirement of watchify
    });

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
    	.pipe(rename('bundle.js'))
    	.pipe(gulp.dest('./build'));
});
