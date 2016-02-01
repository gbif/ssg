var through = require('through2'),
    toc = require('markdown-toc'),
    gutil = require('gulp-util');

module.exports = function () {
    return through.obj(function (file, enc, cb) {
        var jsonToc = toc(file.mdContent).json;
        file.meta.toc = jsonToc;
        this.push(file);
        cb();
    });
}