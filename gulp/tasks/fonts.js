var gulp = require('gulp'),
    path = require('path'),
    gutil = require('gulp-util'),
    nunjucksRender = require('gulp-nunjucks-render'),
    rename = require('gulp-rename'),
    gulpData = require('gulp-data'),
    iconfont = require('gulp-iconfont'),
    config = require('../../config').fonts;

gulp.task('fonts', ['build-font'], function () {
    return gulp.src(path.join(config.iconfontBuildDest, '/**/*.*'))
        .pipe(gulp.dest(config.dest));
});


gulp.task('build-font', function() {
    var runTimestamp = Math.round(Date.now()/1000);
    return gulp.src(config.iconsSrc)
        .pipe(iconfont({
            fontName: 'gbificons', // required
            prependUnicode: true, // recommended option - adds unicode to the filename
            formats: ['ttf', 'eot', 'woff'], // default, 'woff2' and 'svg' are available
            timestamp: runTimestamp, // recommended to get consistent builds when watching files
            normalize: true,
            fontHeight: 448, // matching IcoMoon's defaults for the font-awesome icons @ "14px grid"
            descent:    64
        }))
        .on('glyphs', function(glyphs, options) {
            nunjucksRender.nunjucks.configure(config.template, {watch: false});
            return gulp.src(config.template)
                .pipe(gulpData({
                    glyphs: glyphs,
                    fontName: 'gbificons',
                    fontPath: '/css/fonts/iconfont/',
                    className: 'gb-icon',
                    runTimestamp: runTimestamp
                }))
                .pipe(nunjucksRender())
                .pipe(rename(function (path) {
                    path.basename = 'gb_iconfont';
                    path.extname = '.styl'
                }))
                .pipe(gulp.dest(config.templateDest));
        })
        .pipe(rename(function (path) {
            path.basename = path.basename + runTimestamp;
        }))
        .pipe(gulp.dest(config.iconfontBuildDest));
});
