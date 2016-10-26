var gulp = require('gulp');
var del = require('del');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var ngHtml2Js = require("gulp-ng-html2js");
var minifyHtml = require("gulp-minify-html");
var css2js = require("gulp-css2js");

gulp.task('html2js', function () {
  return gulp.src(['./src/*.html'])
    .pipe(minifyHtml())
    .pipe(ngHtml2Js({
      moduleName: "ionic-datepicker.templates"
    }))
    .pipe(concat("templates.js"))
    //.pipe(uglify())
    .pipe(gulp.dest("./dist"));
});

gulp.task('css2js', function () {
  return gulp.src("./src/*.css")
    .pipe(css2js())
    .pipe(uglify())
    .pipe(gulp.dest("./dist/"));
});

gulp.task('make-bundle', ['del', 'html2js', 'css2js'], function () {
  return gulp.src(['./dist/*', './src/*.js'])
    .pipe(concat('ionic-datepicker.bundle.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./dist/'));
});

gulp.task('del-temp-files', ['make-bundle'], function () {
  del(['./dist/templates.js', './dist/ionic-datepicker.styles.js']);
});

gulp.task('del', function () {
  del(['./dist/*']);
});

gulp.task('build', ['del-temp-files']);

