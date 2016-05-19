const gulp = require('gulp'),
    path = require('path'),
    ava = require('gulp-ava'),
    babel = require('gulp-babel'),
    cache = require('gulp-cached'),
    concat = require('gulp-concat-util'),
    sourcemaps = require('gulp-sourcemaps');

gulp.task('compile-lib', () => {
    return gulp.src('lib/**/*.js')
        .pipe(cache('transpile-lib'))
        .pipe(sourcemaps.init())
        .pipe(babel())
        .pipe(concat.header('var regeneratorRuntime = require(\'babel-regenerator-runtime\');'))
        .pipe(sourcemaps.write('.', { sourceRoot: path.join(__dirname, 'lib') }))
        .pipe(gulp.dest('build/lib'));
});

gulp.task('compile-test', () => {
    return gulp.src('test/**/*.js')
        .pipe(cache('transpile-test'))
        .pipe(sourcemaps.init())
        .pipe(babel())
        .pipe(concat.header('var regeneratorRuntime = require(\'babel-regenerator-runtime\');'))
        .pipe(sourcemaps.write('.', { sourceRoot: path.join(__dirname, 'lib') }))
        .pipe(gulp.dest('build/test'));
});

gulp.task('test', [ 'compile' ], () => {
    return gulp.src('build/test/*.js')
        .pipe(ava());
});

gulp.task('watch', () => {
    gulp.watch('lib/**/*', [ 'compile-lib', 'compile-test' ]);
});

gulp.task('compile', [ 'compile-lib', 'compile-test' ]);

gulp.task('default', [ 'compile', 'test' ]);
