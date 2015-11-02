var gulp = require('gulp');
var config = require('../config');
var browserSync = require('browser-sync');

gulp.task('watch', ['browserSync'], function () {
    gulp.watch(config.templates.src, ['i18n']);
    gulp.watch(config.content, ['i18n']);
    gulp.watch(config.dest + "/index.html").on('change', browserSync.reload);

   	gulp.watch(config.stylus.src, ['stylus']);
    gulp.watch(config.stylus.dest + "/**/*.css").on('change', browserSync.reload);

    gulp.watch(config.javascript.src, ['js']);//tmp
	gulp.watch(config.javascript.dest + "/**/*.js").on('change', browserSync.reload);
});
