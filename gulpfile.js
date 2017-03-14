var path = require('path'),
    gulp = require('gulp'),
    htmlmin = require('gulp-htmlmin'),
    less = require('gulp-less'),
    autoprefix = require('less-plugin-autoprefix'),
    cleancss = require('gulp-clean-css'),
    concat = require('gulp-concat'),
    babel = require('gulp-babel')
    browserify = require('gulp-browserify')


gulp.task('html', function () {
  return gulp.src('./source-code/index.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('./'))
})


gulp.task('css', function () {
  return gulp.src([
    './node_modules/normalize.css/normalize.css',
    './node_modules/gridlex/src/gridlex.less',
    './source-code/css/index.less'
  ])
    .pipe(less({
      plugins: [
        new autoprefix({ browsers: ['last 2 versions'] })
      ]
    }))
    .pipe(concat('main.css'))
    .pipe(cleancss({ compatibility: 'ie8' }))
    .pipe(gulp.dest('./'))
})


gulp.task('js', function () {
  return gulp.src('./source-code/js/index.js')
    .pipe(babel())
    .pipe(concat('main.js'))
    .pipe(browserify({
      insertGlobals: true
    }))
    .pipe(gulp.dest('./'))
})


gulp.task('watch', function () {
  gulp.watch([
    './source-code/index.html',
    './source-code/css/*',
    './source-code/js/*',
  ], ['html', 'css', 'js'])
})
