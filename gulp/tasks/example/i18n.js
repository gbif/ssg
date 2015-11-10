var gulp = require('gulp'),
    config = require('../../config'),
    path = require('path'),
    gbif_i18n = require('../../../index.js'),
    validate = gbif_i18n.helpers.validate,
    getYamlFile = gbif_i18n.helpers.getYamlFile,
    frontMatter = require('gulp-front-matter'),
    marked = require('gulp-marked'),
    renderer = gbif_i18n.renderer,
    applyTemplate = gbif_i18n.plugins.applyTemplate,
    filter = gbif_i18n.plugins.filter,
    build = gbif_i18n.plugins.build,
    lunr = gbif_i18n.plugins.lunr,
    langFileName, languageData;


//get language file
langFileName = './content/languages.yml'; // TODO Hardcoded language file location
languageData = getYamlFile(langFileName);
validate.validateLanguageFile(languageData, langFileName); //make sure that the language file is on the correct format
languageData.list = Object.keys(languageData.languages).map(function (lang) { //create list of language keys. only because it makes it easier to iterate elsewhere
    return lang;
});


//Create the task that builds the actual html files based on the configuration object
gulp.task('build-main', [], function () {
    var langFiles, template, search, merge; //Streams

    //create stream with language versions and metadata
    langFiles = gulp.src(config.content)
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
        .pipe(applyTemplate(gbif_i18n.config.template, languageData))
        .pipe(gulp.dest(config.dest));

    // Build a search index using Lunr. The plugin expects a markdown content attribute on the file object.
    // this attribute is added while creating the language versions.
    // The file content itself is being transformed to html in parallel
    search = langFiles
        .pipe(lunr())
        .pipe(gulp.dest(config.dest + '/lunr'));//this location is used hardcoded in src/js/search as the location to use for loading the index

    //merge streams
    merge = require('merge-stream')();
    merge.add(template);
    merge.add(search);
    return merge.isEmpty() ? null : merge;
});


// Once site is build then copy main language version to root.
gulp.task('build-root', ['build-main'], function () {
    return gulp.src(path.join(config.dest, languageData.list[0], '/index.html'))
        .pipe(gulp.dest(config.dest));
});
