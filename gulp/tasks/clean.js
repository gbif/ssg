var gulp = require('gulp'),
    del = require('del'),
    config = require('../../config').clean;

gulp.task('clean-all', function (cb) {
    del(config.all).then(function () {
        cb();
    });
});