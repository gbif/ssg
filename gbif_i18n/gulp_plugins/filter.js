/*
Filter based on file attributes. Consider introducing error handling as an option and remove validation of frontmattter from validate.js

file.im.here = 10
would pass
filter.onlyIf(['im', 'here'], 10) AND
filter.onlyIf(['im', 'here']) AND
filter.unless(['im', 'here'], 12) AND
filter.unless(['im', 'still', here'])

BUT NOT
filter.onlyIf(['im', 'here'], 11) OR
filter.onlyIf(['im', 'happy'], 10) OR
filter.onlyIf(['im', 'not', here'])
filter.unless(['im', 'here'], 10)
*/
var through = require('through2'),
    gutil = require('gulp-util');

function filter(loc, options, unless) {
    "use strict";
    var value = options.value || undefined,
        error = options.error || false;
    return through.obj(function (file, enc, cb) {
        if (exists(loc, value, file) ? !unless : unless) {
            this.push(file);
        } else if (error) {
            var description = unless ? 'Illegal' : 'Required',
                errorString = description + ' object field: "' + loc.toString() + ' ' + value + ' " in file ' + file.path;
            //throw new gutil.PluginError('gbif-ssg-filter', errorString);
            this.emit("error", new Error(errorString));
        }
        cb();
    });
}

function exists(loc, value, startObj) {
    "use strict";
    var last = startObj;
    for (var i = 0; i < loc.length; i++) {
        if (typeof last[loc[i]] === 'undefined') {
            return false;
        } else {
            last = last[loc[i]];
        }
    }
    if (last === value || typeof value === 'undefined') {
        return true;
    }
    return false;
}

function onlyIf(loc, options) {
    "use strict";
    return filter(loc, options, false);
}

function unless(loc, options) {
    "use strict";
    return filter(loc, options, true);
}

module.exports = {
    onlyIf: onlyIf,
    unless: unless
}