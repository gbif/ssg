var gulp = require('gulp'),
    rename = require('gulp-rename'),
    config = require('../../config').error404;

gulp.task('error404', [], function () {
    return gulp.src(config.src)
        .pipe(rename(function (path) {
            path.basename = "custom_404";
        }))
        .pipe(gulp.dest(config.dest));
});