var gulp = require('gulp');
var rename = require('gulp-rename');
var replace = require('gulp-replace');
var gulpif = require('gulp-if');
var concat = require('gulp-concat');
var browserSync = require('browser-sync');



gulp.task('bundleJS', function () {
    return gulp.src([
        'bower_components/angular/angular.min.js',
        'bower_components/angular-route/angular-route.min.js',
        'bower_components/angular-animate/angular-animate.min.js',
        'bower_components/angular-sanitize/angular-sanitize.min.js',
        'bower_components/angular-resource/angular-resource.min.js',
        'bower_components/angular-aria/angular-aria.min.js',
        'bower_components/angular-touch/angular-touch.min.js',
        'bower_components/angular-material/angular-material.min.js',
        'bower_components/angular-local-storage/dist/angular-local-storage.min.js'
    ])
        .pipe(concat('bower-bundle.min.js'))
        .pipe(gulp.dest('app/lib/js'))
});

gulp.task('bundleCSS', function () {
    return gulp.src([
        'bower_components/angular-material/angular-material.min.css',
        'bower_components/components-font-awesome/css/font-awesome.min.css',
        'bower_components/animate.css/animate.min.css'
    ])
        .pipe(gulp.dest('app/lib/css'))
});

gulp.task('bundleFonts', function () {
    gulp.src([
        'bower_components/components-font-awesome/fonts/**'
    ])
        .pipe(gulp.dest('app/lib/fonts'))
});

gulp.task('default', ['bundleJS', 'bundleCSS', 'bundleFonts'], function () {

});

// Static server
gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: "./app"
        }
    });
});