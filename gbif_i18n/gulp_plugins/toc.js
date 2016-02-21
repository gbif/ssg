var through = require('through2'),
    toc = require('markdown-toc'),
    gutil = require('gulp-util');

module.exports = function () {
    return through.obj(function (file, enc, cb) {
        var jsonToc = toc(file.contents.toString()).json;
    	file.contents = new Buffer(toc.insert(file.contents.toString(), {open: '<div class="toc"></div>\n\n'}), 'utf8');

        file.meta.toc = jsonToc;
        this.push(file);
        cb();
    });
}