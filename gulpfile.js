var gulp = require('gulp');
var browserify = require('browserify');
var reactify = require('reactify');
var source = require('vinyl-source-stream');
var rename = require('gulp-rename');

gulp.task('default', function() {
    var bundler = browserify({
        entries: ['./src/app.js'], // Only need initial file, browserify finds the deps
        transform: [reactify], // We want to convert JSX to normal javascript
        debug: true, // Gives us sourcemapping
        cache: {}, packageCache: {}, fullPaths: true // Requirement of watchify
    });

    return bundler.bundle()
    	.pipe(source('./src/app.js'))
    	.pipe(rename('bundle.js'))
    	.pipe(gulp.dest('./build'));
});