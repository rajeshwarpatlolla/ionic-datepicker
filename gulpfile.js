var path = require('path');
var gulp = require('gulp');
var clean = require('gulp-clean');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var ngHtml2Js = require("gulp-ng-html2js");
var minifyHtml = require("gulp-minify-html");
var minifycss = require("gulp-minify-css");

gulp.task('html2js', function () {
    gulp.src(['./src/*.html'])
        .pipe(minifyHtml())
        .pipe(ngHtml2Js({
            moduleName: "ionic-datepicker.templates"
        }))
        .pipe(concat("templates.js"))
        .pipe(uglify())
        .pipe(gulp.dest("./dist"));
});

gulp.task('build',['html2js','cssminify'], function () {
    gulp.src(['./src/ionic-datepicker.js'])
        .pipe(uglify())
        .pipe(gulp.dest("./dist"));
});

gulp.task('cssminify', function () {
    return gulp.src('./src/*.css')
        .pipe(minifycss())
        .pipe(gulp.dest('./dist'));
});

gulp.task('clean', function () {
    return gulp.src('dist', {read: false})
        .pipe(clean());
});

gulp.task('default',['clean','build']);
