var gulp = require('gulp');
var del = require('del');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var ngHtml2Js = require("gulp-ng-html2js");
var minifyHtml = require("gulp-minify-html");
var css2js = require("gulp-css2js");
var sass = require("gulp-sass");
var autoprefixer = require('gulp-autoprefixer');

var sassOptions = {
    indentWidth: 4,
    outputStyle: 'expanded',
    errorLogToConsole: true
};

var autoprefixerOptions = {
  browsers: [
    '> 1%',
    'last 2 versions',
    'firefox >= 4',
    'safari 7',
    'safari 8',
    'IE 9',
    'IE 10',
    'IE 11'
  ]
};

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
  return gulp.src("./src/**/ionic-datepicker.styles.scss")
    .pipe(concat("ionic-datepicker.styles.css"))
    .pipe(sass(sassOptions).on('error', sass.logError))
    .pipe(autoprefixer(autoprefixerOptions))
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

