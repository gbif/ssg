var gulp = require('gulp'),
    frontMatter = require('gulp-front-matter'),
    marked = require('gulp-marked'),
    through = require('through2'),
    prettify = require('gulp-html-prettify'),
    renderer = require('./renderer/renderer'),
    validate = require('./helpers/validate'),
    applyTemplate = require('./gulp_plugins/applyTemplate'),
    filter = require('./gulp_plugins/filter'),
    build = require('./gulp_plugins/i18n_build'),
    lunr = require('./gulp_plugins/gulp-lunr');


module.exports = function (conf, languageData) {
    "use strict";

    function gulpBuild() {
        var langFiles, template, search, merge; //Streams

        //create stream with language versions and metadata
        langFiles = gulp.src(conf.content)
            .pipe(frontMatter({ //remove Yaml front matter from file and add it to file object as attribute "frontMatter"
                property: 'frontMatter',
                remove: true
            }))
            .pipe(filter.onlyIf(['frontMatter', 'title'], {error: true})) //fail if title is not present in front matter
            .pipe(filter.unless(['frontMatter', 'draft'], {value: true})) //remove files that are marked as drafts
            .pipe(build(languageData.list)); //create language versions and attach metadata about menu structure to file objects

        //We now got the files with metadata and in all language versions. Split streams and process templating and search in parallel
        template = langFiles
            .pipe(marked({
                renderer: renderer //render using custom markdown renderer
            }))
            .pipe(applyTemplate('./src/templates/main.html', languageData)) // TODO Hardcoded template file location
            .pipe(gulp.dest(conf.dest));

        // Build a search index using Lunr. The plugin expects a markdown content attribute on the file object.
        // this attribute is added while creating the language versions.
        // The file content itself is being transformed to html in parallel
        search = langFiles
            .pipe(lunr())
            .pipe(gulp.dest(conf.lunr.dest));

        //merge streams
        merge = require('merge-stream')();
        merge.add(template);
        merge.add(search);
        return merge.isEmpty() ? null : merge;
    }

    return gulpBuild;
};
