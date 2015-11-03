'use strict';
var path = require('path'),
    gutil = require('gulp-util'),
    through = require('through2'),
    dict, versions, config;

module.exports = function (conf) {
  if (!conf) {
   throw new gutil.PluginError('gbif-ssg-i18n', 'A configuration object is required');
  }
    config = JSON.parse(JSON.stringify(conf));
    dict = {};
    versions = {};

  return through.obj(function (file, enc, cb) {
    if (file.relative === '') {
      cb();
      return;
    }
    addLanguageVersions(file);

    cb();
  }, function (cb) {
        var stream = this;

        config.navigation.sections.forEach(function(e){
            if (e.children) {
                e.children = Object.keys(e.children).sort().map(function(i){
                    return e.children[i];
                });
            }
        });

    Object.keys(dict).forEach(function(key){
      dict[key].navigation = config.navigation;
            var langVersions = versions[dict[key].meta.dir];
      dict[key].meta.versions = Object.keys(langVersions).sort().map(function(v){
                return {
                    lang: v,
                    url: langVersions[v]
                }
            });
      stream.push(dict[key]);
    });

    cb();
  });
};

function addLanguageVersions(file) {
    var extname = path.extname(file.path);
    var basename = path.basename(file.path, extname);
    var contentLanguage = basename.substr(basename.length-2);
    var siteLanguage = contentLanguage;
    var dir = path.dirname(file.relative);
    
    var section = config.navigation.sections.find((e,i,a) => e.id == file.frontMatter.category && e.type == 'category');

    if (dir != '.' && !section) {
        return;
    }

    var copy = file.clone();
    add(file, siteLanguage, contentLanguage, section);

    if (contentLanguage == config.languages.main) {
        //copy to other languages if missing
        config.languages.all.forEach(function(e){
            if (e != config.languages.main && !dict.hasOwnProperty(path.join(e, dir))) {
                add(copy, e, contentLanguage, section);
            }
        });
    }
}

function add(file, siteLanguage, contentLanguage, section) {
    var dir = path.dirname(file.relative);
    
    var folder = section ? section.lang[siteLanguage].title : '';
    var title = file.frontMatter.type == 'root' ? '' : file.frontMatter.title;
    var prettyUrl = path.join(siteLanguage, folder, title).replace(/\s/g, '-').toLowerCase();

    if (dir == '.') {
        prettyUrl = contentLanguage;
    }
    file.meta = {
        originalPath: file.relative,
        siteLanguage: siteLanguage,
        contentLanguage: contentLanguage,
        frontMatter: file.frontMatter,
        dir: dir,
        folder: section? section.folder : '',
        prettyUrl: prettyUrl
    };
    file.path = path.join(file.base, prettyUrl, 'index.md');
    dict[path.join(siteLanguage, dir)] = file;
    versions[dir] = versions[dir] || {};
    versions[dir][file.meta.siteLanguage] = prettyUrl;
    
    if (section) {

        if (file.meta.frontMatter.type == 'root') {
            section.lang[siteLanguage].url = prettyUrl;
            // section.lang[siteLanguage].title = file.meta.frontMatter.title;
        }
        else {
            section.children = section.children || {};
            section.children[file.meta.dir] = section.children[file.meta.dir] || {};
            section.children[file.meta.dir][siteLanguage] = {
                title: file.meta.frontMatter.title,
                url: file.meta.prettyUrl,
            }
        }
    }
}