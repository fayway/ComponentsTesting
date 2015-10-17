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

gulp.task('livereload', function () {
    gulp.src('src/**')
        .pipe(connect.reload());
});

gulp.task('watch', function () {
    gulp.watch(['src/**'], ['livereload']);
});

gulp.task('default', ['connect', 'watch']);

//@todo To integrate Babel transpilation with RequireJS
gulp.task('es6', function () {
    gulp.src('src/js/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(babel())
        .pipe(concat('bundle.js'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist'));
});
