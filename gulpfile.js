var gulp = require('gulp'),
    runSequence = require('run-sequence'),
    gutil = require('gulp-util'),
    concat = require('gulp-concat'),
    del = require('del');

var src = 'src';
var dist = './bower_build';
var conf = {
    jsSrc: [
        './node_modules/jquery/dist/**/jquery.js',
        './node_modules/lunr/lunr.js',
        src + '/js/helpers.js',
        src + '/js/cookies.js',
        src + '/js/**/*.js'],
    jsDest: dist,
    stylusSrc: [src + '/stylus/**/*.*'],
    stylusDest: dist + '/stylus/',
    iconsSrc: [src + '/fonts/icons/used/**/*.*', src + '/fonts/fonttemplate.styl'],
    iconsDest: dist + '/icons/'
};

gulp.task('clean', function (cb) {
    del(dist).then(function () {
        cb();
    });
});

gulp.task('js', [], function () {
    return gulp.src(conf.jsSrc)
        .pipe(concat('script.js'))
        .pipe(gulp.dest(conf.jsDest));
});

gulp.task('stylus', [], function () {
    return gulp.src(conf.stylusSrc)
        .pipe(gulp.dest(conf.stylusDest));
});

gulp.task('fonts', [], function () {
    return gulp.src(conf.iconsSrc)
        .pipe(gulp.dest(conf.iconsDest));
});

gulp.task('default', function (callback) {
    runSequence(
        ['clean'],
        ['js', 'stylus', 'fonts'],
        callback);
});
