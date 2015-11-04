var gulp = require('gulp'),
	runSequence = require('run-sequence'),
	path = require('path'),
	gbif_i18n_main = require('./main');

// Create gulp tasks based on configuration object. A prettier way might be to just use the gulp-plugins
// as we do in this task, but that would make updating all sites more cumbersome if we need to make changes beyond the plugin.
// So for now it is registered as a task.
module.exports = function (conf) {
    gulp.task('gbif-ssg-i18n--main', [], gbif_i18n_main(conf));

    // Once site is build then copy main language version to root.
    gulp.task('gbif-ssg-i18n--root', [], function () {
        return gulp.src(path.join(conf.dest, conf.navigation.languages.main, '/index.html'))
            .pipe(gulp.dest(conf.dest));
    });

    return function (callback) {
        runSequence(
            ['gbif-ssg-i18n--main'],
            ['gbif-ssg-i18n--root'],
            callback);
    }
};
