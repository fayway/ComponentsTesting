var gulp = require('gulp');
var connect = require('gulp-connect')
var sourcemaps = require('gulp-sourcemaps');
var babel = require('gulp-babel');
var concat = require('gulp-concat');
var rjs = require('requirejs');
var rimraf = require('gulp-rimraf');

gulp.task('connect', function () {
    connect.server({
        livereload: true
    });
});

gulp.task('livereload', function () {
    gulp.src(['src/**', 'test/**'])
        .pipe(connect.reload());
});

gulp.task('watch', function () {
    gulp.watch(['src/**', 'test/**'], ['livereload']);
});

gulp.task('default', ['connect', 'watch']);

gulp.task('clean', function () {
    return gulp.src('dist', {read: false})
        .pipe(rimraf());
})

//
gulp.task('compile', ['clean'], function () {
    rjs.optimize({
        baseUrl: 'src/js',
        paths: {
            'templates': '../templates',
            'ractive': '../../node_modules/ractive/ractive',
            'promise': '../../node_modules/native-promise-only/npo',
            'text': '../../node_modules/requirejs-text/text',
            '_': '../../node_modules/lodash/index',
            'jquery': '../../node_modules/jquery/dist/jquery'
        },
        dir: 'dist/',
        optimize: 'uglify2',
        skipDirOptimize: false,
        useStrict: true,
        findNestedDependencies: true,
        normalizeDirDefines: 'all',
        preserveLicenseComments: false,
        modules: [{
            name: 'main'
        }, {
            name: 'mainForTests'
        }]
    });
});

//@todo To integrate Babel transpilation with RequireJS
gulp.task('es6', function () {
    gulp.src('src/js/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(babel())
        .pipe(concat('bundle.js'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist'));
});
