'use strict';

var gulp            = require('gulp'),
    browserSync     = require('browser-sync'),
    config          = require('../config'),
    uglify          = require('gulp-uglify');

gulp.task('scripts', ['scripts-lint'], function() {
    return gulp.src([
            // setup script sequence
            config.scripts.src + '/modernizr-custom.js',
            config.scripts.src + '/afontgarde.js',
            config.scripts.src + '/select-replace.js',
            config.scripts.src + '/edx-icons.js',
            config.scripts.src + '/testing.js'
        ])
        .pipe(uglify())
        .pipe(browserSync.reload({stream: true}))
        .pipe(gulp.dest(config.scripts.dest));
});
