var through = require('through2'),
    swig = require('swig'),
    gutil = require('gulp-util');

swig.setDefaults({ cache: false });

swig.setFilter('startsWith', function (input, start) {
    return input.startsWith(start)
});

module.exports = function (tpl, languages, translations) {
    if (typeof tpl !== 'string') {
        var errorString = tpl + ' is not a valid template name'
        throw new gutil.PluginError('applyTemplate.js plugin', errorString);
    }
    var tpl = swig.compileFile(tpl);
    return through.obj(function (file, enc, cb) {
        //console.log(file.meta.menu);
        var data = {
            languages: languages,
            meta: file.meta.item,
            versions: file.meta.versions,
            nav: file.meta.menu,
            content: file.contents.toString(),
            i18n: translations
        };
        file.contents = new Buffer(tpl(data), 'utf8');
        this.push(file);
        cb();
    });
}