var gulp = require('gulp');
var connect = require('gulp-connect')
var sourcemaps = require('gulp-sourcemaps');
var babel = require('gulp-babel');
var concat = require('gulp-concat');

gulp.task('connect', function () {
    connect.server({
        livereload: true
    });
});

gulp.task('es6', function () {
    gulp.src('src/js/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(babel())
        .pipe(concat('bundle.js'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist'));
});

gulp.task('livereload', function () {
    gulp.src(['dist/bundle.js', 'src/templates/**'])
        .pipe(connect.reload());
});

gulp.task('watch', function () {
    gulp.watch(['src/js/**/*.js'], ['es6']);
});

gulp.task('default', ['connect', 'livereload', 'watch']);