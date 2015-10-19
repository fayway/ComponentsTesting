var gulp = require('gulp');
var connect = require('gulp-connect')
var sourcemaps = require('gulp-sourcemaps');
var babel = require('gulp-babel');
var concat = require('gulp-concat');
var rjs = require('requirejs');

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

//
gulp.task('compile', function () {
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
        uglify2: {
            output: {
                beautify: false
            },
            beautify: {
                semicolons: false
            }
        },
        skipDirOptimize: false,
        preserveLicenseComments: false,
        findNestedDependencies: true,
        normalizeDirDefines: 'all'
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
