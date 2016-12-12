var config = require('./config.js');

var URL = config.URL;

var gulp = require('gulp'),
    webpackStream = require('webpack-stream'),
    webpack = require('webpack'),
    postcss = require('gulp-postcss'),
    plumber = require('gulp-plumber'),
    browserSync = require('browser-sync'),
    runSequence = require('run-sequence'),
    autoprefixer = require('autoprefixer'),
    del = require('del');


// Process CSS
gulp.task('css', function() {
    var processors = [
        autoprefixer({browsers: ['last 2 versions']})
    ];
    return gulp.src('./src/**/*.css')
        .pipe(postcss(processors))
        .pipe(plumber())
	    .pipe(gulp.dest('./dist/'))
        .pipe( browserSync.stream() );
});


// Process Javascript
gulp.task('js', function(){
    return gulp.src('./src/main.js')
        .pipe(plumber())
        .pipe(webpackStream(require('./webpack.config.js'), webpack))   
        .pipe(gulp.dest('./dist/'))
        .pipe( browserSync.stream() );

});


// Process HTML
gulp.task('html', function() {
    // Copy all HTML files to dist folder
    return gulp.src('./src/**/*.html')
        .pipe(gulp.dest('./dist/'))
        .pipe( browserSync.stream() );
});

// Move assets to dist
gulp.task('assets', function() {
    // Copy all HTML files to dist folder
    return gulp.src('./src/view/assets/**/*')
        .pipe(gulp.dest('./dist/assets'))
        .pipe( browserSync.stream() );
});

// Move templates to dist
// gulp.task('templates', function() {
//     // Copy all HTML files to dist folder
//     return gulp.src('./src/view/templates/**/*')
//         .pipe(gulp.dest('./dist/templates'))
//         .pipe( browserSync.stream() );
// });


// Static server
gulp.task('browser-sync', function() {
    browserSync({
        proxy: URL,
        notify: false
    });
});

// Watch
gulp.task('watch', function() {
    // Watch .css files
    gulp.watch('./src/**/*.css', ['css']);

    // Watch .js files
    gulp.watch('./src/**/*.js', ['js']);

    // Watch .html files
    gulp.watch('./src/**/*.html', ['html']);

});


// Clean dist
gulp.task('clean', function() {
	return del(['dist/**/*']);
});

// Default
gulp.task('default', function() {
  runSequence(['clean', 'html', 'css', 'js', 'assets',/* 'templates',*/ 'browser-sync', 'watch']);
});