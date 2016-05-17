const gulp = require('gulp'),
    ava = require('gulp-ava'),
    babel = require('gulp-babel'),
    cache = require('gulp-cached'),
    concat = require('gulp-concat-util');

gulp.task('compile-lib', () => {
    return gulp.src('lib/**/*')
        .pipe(cache('transpile'))
        .pipe(babel())
        .pipe(concat.header('var regeneratorRuntime = require(\'babel-regenerator-runtime\');'))
        .pipe(gulp.dest('build/lib'));
});

gulp.task('compile-test', () => {
    return gulp.src('test/**/*')
        .pipe(cache('transpile'))
        .pipe(babel())
        .pipe(concat.header('var regeneratorRuntime = require(\'babel-regenerator-runtime\');'))
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
