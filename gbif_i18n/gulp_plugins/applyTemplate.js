var through = require('through2'),
    swig = require('swig'),
    gutil = require('gulp-util');

module.exports = function (tpl, languages) {
    if (typeof tpl !== 'string') {
        var errorString = tpl + ' is not a valid template name'
        throw new gutil.PluginError('applyTemplate.js plugin', errorString);
    }
    var tpl = swig.compileFile(tpl);
    return through.obj(function (file, enc, cb) {
        // console.log(file.meta.menu);
        var data = {
            languages: languages,
            meta: file.meta.item,
            versions: file.meta.versions,
            nav: file.meta.menu,
            content: file.contents.toString()
        };
        file.contents = new Buffer(tpl(data), 'utf8');
        this.push(file);
        cb();
    });
}