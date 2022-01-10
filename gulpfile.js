'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();
const sourcemaps = require('gulp-sourcemaps');
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');

function buildStyles() {
    return gulp.src([
        './sass/base.scss',
        './sass/**/*.scss'
    ])
        .pipe(sourcemaps.init())
        .pipe(concat('style.css'))
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            cascade: false
		}))
        // .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./css'));
};

//function watch () {
// gulp.watch('./sass/**/*.scss', ['sass']);
// }; 

function startServer() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });

    gulp.watch('./sass/', buildStyles);

    gulp.watch([
        "./css/",
        "./*.html"
    ]).on('change', browserSync.reload);

}

module.exports = {
    buildStyles,
    startServer
}
