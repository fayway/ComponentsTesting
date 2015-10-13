var gulp = require('gulp');
var connect = require('gulp-connect');

gulp.task('connect', function () {
    connect.server({
        livereload: true
    });
});

gulp.task('source', function () {
    gulp.src('src/**')
        .pipe(connect.reload());
});

gulp.task('watch', function () {
    gulp.watch(['src/**'], ['source']);
});

gulp.task('default', ['connect', 'watch']);