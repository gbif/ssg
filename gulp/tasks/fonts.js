var gulp = require('gulp'),
    config = require('../../config').fonts;

gulp.task('fonts', [], function () {
    return gulp.src(config.src)
        .pipe(gulp.dest(config.dest));
});


//gulp.task('build-font', function() {
//    return buildFont();
//});
//
//function buildFont() {
//    var runTimestamp = Math.round(Date.now()/1000);
//    return gulp.src(config.iconfont.paths)
//        .pipe(g.iconfont({
//            fontName: 'gbificons', // required
//            appendUnicode: true, // recommended option - adds unicode to the filename
//            formats: ['ttf', 'eot', 'woff'], // default, 'woff2' and 'svg' are available
//            timestamp: runTimestamp, // recommended to get consistent builds when watching files
//            normalize: true,
//            fontHeight: 448, // matching IcoMoon's defaults for the font-awesome icons @ "14px grid"
//            descent:    64
//        }))
//        .on('glyphs', function(glyphs, options) {
//            g.nunjucksRender.nunjucks.configure(config.iconfont.templatePath, {watch: false});
//            return gulp.src(config.iconfont.templatePath)
//                .pipe(g.data({
//                    glyphs: glyphs,
//                    fontName: 'gbificons',
//                    fontPath: '/iconfont/',
//                    className: 'gb-icon'
//                }))
//                .pipe(g.nunjucksRender())
//                .pipe(g.rename(function (path) {
//                    path.basename = "gb_iconfont";
//                    path.extname = ".styl"
//                }))
//                .pipe(gulp.dest(config.iconfont.templateDest));
//        })
//        .pipe(gulp.dest(config.iconfont.dest));
//}