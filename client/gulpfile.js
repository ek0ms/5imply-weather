// 'use strict'

// dependencies
const gulp = require('gulp');
const sass = require('gulp-sass');
const minifyCSS = require('gulp-clean-css');
const rename = require('gulp-rename');

// SCSS/CSS //
const SCSS_SRC = './src/styles/**/*.scss';
const SCSS_DEST = './src/styles/';

// compiles css //
gulp.task('compile_scss', () => {
  gulp
    .src('./src/styles/index.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(minifyCSS())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(SCSS_DEST));
});

// detect changes in SCSS_SRC
gulp.task('watch_scss', () => {
  gulp.watch(SCSS_SRC, ['compile_scss']);
});

// run tasks
gulp.task('default', ['watch_scss']);
