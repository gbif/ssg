/*
map md-files to language versions and change destination path to pretty urls based on folder structure.
Attach meta data to file objects. The meta data is menu information, front matter, and markdown content (the later is kept for indexing).

markdown marked with
type: menu only
will not be build, but included in the menu as an item
 */
var through = require('through2'),
    objectSetter = require('../helpers/objectSetter'),
    path = require('path'),
    gutil = require('gulp-util');

module.exports = build;

function build(languages) {
    var menu = menu || {},
        dict = dict || {};

    function add(file, enc, cb) {
        if (file.relative !== '') {
            addFile(dict, menu, file, languages);
        }
        cb();
    }

    function end(cb) {
        var stream = this;

        //create menu
        Object.keys(dict).forEach(function (key) {
            "use strict";
            var menuItem = dict[key];
            //if the item doesn't exist in all language versions then skip it. This is only the case when the main language version is missing
            if (Object.keys(menuItem).length != languages.length) {
                delete dict[key];
                return;
            }
            addToMenu(menu, key, menuItem);
        });

        //convert menu children that are stored as a dictionary to arrays sorted on keys. Keys corresponds to the directories
        childrenToList(menu);

        //Add meta data to files and push them to stream
        Object.keys(dict).forEach(function (key) {
            "use strict";
            var menuItem = dict[key];

            //If this md file only carries information about the menu category title or is an external link,
            // then skip it
            var type = menuItem[languages[0]].meta.fm.type;
            if (type == 'menu only' || type == 'link') {
                return;
            }

            //get language versions of item
            var versions = {};
            Object.keys(menuItem).forEach(function (languageKey) {
                versions[languageKey] = menuItem[languageKey].meta.prettyUrl;
            });

            //create metadata and push file to stream. do so for all language versions
            Object.keys(menuItem).forEach(function (languageKey) {
                menuItem[languageKey].file.meta = {
                    item: menuItem[languageKey].meta,
                    versions: versions,
                    menu: menu
                }
                stream.push(menuItem[languageKey].file);
            });
        });

        cb();
    }

    return through.obj(add, end);
}

function childrenToList(obj) {
    "use strict";
    //recursively convert all children-object to lists sorted by object key
    //recursion stop
    if (typeof obj === 'undefined' || Object.prototype.toString.call(obj.children) !== '[object Object]') {
        return;
    }

    obj.children = Object.keys(obj.children).sort().map(function (key) {
        childrenToList(obj.children[key]);
        return obj.children[key];
    });
}
function addToMenu(menu, dir, item) {
    "use strict";
    var location = [];
    path.join(dir, 'menuItem').split('/').forEach(function (e, i, a) {
        if (a.length > i + 1) {
            location.push('children');
        }
        location.push(e);
    });
    Object.keys(item).forEach(function (languageKey) {
        //objectSetter.set([menu, ...location, languageKey], item[languageKey].meta); // es6 spread syntax
        var loc = [].concat([menu], location, [languageKey]);
        objectSetter.set(loc, item[languageKey].meta);
    });
}

function getPrettyUrl(dir, language) {
    "use strict";
    var prettyUrl = path.join(language, dir.toLowerCase().replace(/[0-9]{2}./g, '').replace(/\s/g, '-'));
    return prettyUrl;
}

function addFile(dict, menu, file, languages) {
    "use strict";
    var dir = path.dirname(file.relative),
        extName = path.extname(file.path),
        basename = path.basename(file.path, extName),
        contentLanguage = basename,//basename.substr(basename.length - 2),
        menuItem = getMenuItem(file, dir, contentLanguage);
    if (languages.indexOf(contentLanguage) == -1) {
        return; // language not included on the language file
    }
    if (contentLanguage == languages[0]) {
        languages.forEach(function (e) {
            var menuItemClone = getMenuItem(file.clone(), dir, e);
            objectSetter.set([dict, dir, e], menuItemClone);
        });
    }
    objectSetter.update([dict, dir, contentLanguage], menuItem);
}

function getMenuItem(file, dir, language) {
    "use strict";

    var prettyUrl = getPrettyUrl(dir, language),
        fm = JSON.parse(JSON.stringify(file.frontMatter)),
        menuItem = {
            meta: {
                fm: fm,
                siteLanguage: language,
                prettyUrl: prettyUrl
            },
            file: file
        };
    file.mdContent = file.contents.toString();
    menuItem.file.path = path.join(file.base, prettyUrl, 'index.md');

    return menuItem;
}
