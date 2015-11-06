var gulp = require('gulp'),
    swig = require('swig'),
    frontMatter = require('gulp-front-matter'),
    marked = require('gulp-marked'),
    through = require('through2'),
    prettify = require('gulp-html-prettify'),
    renderer = require('./renderer/renderer'),
    validate = require('./helpers/validate'),
    applyTemplate = require('./gulp_plugins/applyTemplate'),
    filter = require('./gulp_plugins/filter'),
    build = require('./build'),
    lunr = require('./lunr/gulp-lunr'),
    getYamlFile = require('./helpers/getYml');

swig.setDefaults({ cache: false });

swig.setFilter('startsWith', function (input, start) {
    return input.startsWith(start)
});

module.exports = function (conf, languageData) {
    "use strict";

    function gulpBuild() {
        var langFiles, template, search, merge; //Streams

        //create stream with language versions and metadata
        langFiles = gulp.src(conf.content)
            .pipe(frontMatter({ //remove frontmatter from file and add it to file object as attribute "frontMatter"
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
}
