var gulp = require('gulp'),
	runSequence = require('run-sequence'),
	path = require('path'),
	gbif_i18n_main = require('./main');

module.exports = function (conf) {
    gulp.task('gbif-ssg-i18n--main', [], gbif_i18n_main(conf));

    gulp.task('gbif-ssg-i18n--root', [], function (callback) {
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
