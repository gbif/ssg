var gulp = require('gulp'),
    config = require('../../config'),
    browserSync = require('browser-sync');

gulp.task('watch', ['browserSync'], function () {

    //If changes on either templates or content files, then rebuild html
    gulp.watch(config.templates.src, ['build-root']);
    gulp.watch(config.content, ['build-root']);
    gulp.watch(config.dest + "/index.html").on('change', browserSync.reload);

    //rebuild css
    gulp.watch([config.stylus.src, config.stylus.coresrc], ['stylus']);
    gulp.watch(config.dest + "/**/*.css").on('change', browserSync.reload);

    //rebuild js
    gulp.watch(config.javascript.src, ['js']);
    //gulp.watch(config.customJavascript.src, ['js']);
    gulp.watch(config.javascript.dest + "/**/*.js").on('change', browserSync.reload);

    //rebuild js
    gulp.watch(config.images.src, ['images']);//tmp
    gulp.watch(config.images.dest + "/**/*.*").on('change', browserSync.reload);
});
