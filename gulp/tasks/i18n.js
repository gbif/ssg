var gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    notify = require("gulp-notify"),
    base = '../../gbif_i18n',
    config = require('../../config'),
    path = require('path'),
    renderer = require(base + '/renderer/renderer'),
    validate = require(base + '/helpers/validate'),
    applyTemplate = require(base + '/gulp_plugins/applyTemplate'),
    filter = require(base + '/gulp_plugins/filter'),
    build = require(base + '/gulp_plugins/i18n_build'),
    toc = require(base + '/gulp_plugins/toc'),
    getYamlFile = require(base + '/helpers/getYml'),
    lunr = require(base + '/gulp_plugins/gulp-lunr'),
    frontMatter = require('gulp-front-matter'),
    marked = require('gulp-marked'),
    highlight = require('highlight.js'),
    langFileName, languageData,
    translations = getYamlFile('./translations.yml');

//get language file
langFileName = config.languageFile;
languageData = getYamlFile(langFileName);
validate.validateLanguageFile(languageData, langFileName); //make sure that the language file is on the correct format
languageData.list = Object.keys(languageData).map(function (lang) { //create list of language keys. only because it makes it easier to iterate elsewhere
    return lang;
});

//Create the task that builds the actual html files based on the configuration object
gulp.task('build-main', ['templates'], function () {
    var langFiles, template, search, merge; //Streams

    //create stream with language versions and metadata
    langFiles = gulp.src(config.content)
        .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
        .pipe(frontMatter({ //remove Yaml front matter from file and add it to file object as attribute "frontMatter"
            property: 'frontMatter',
            remove: true
        }))
        .pipe(filter.onlyIf(['frontMatter', 'title'], {error: true})) //fail if title is not present in front matter
        .pipe(filter.unless(['frontMatter', 'draft'], {value: true})) //remove files that are marked as drafts
        .pipe(build(languageData.list)); //create language versions and attach metadata about menu structure to file objects

    //We now got the files with metadata and in all language versions. Split streams and process templating and search in parallel
    template = langFiles
        .pipe(toc())
        .pipe(marked({
            renderer: renderer, //render using custom markdown renderer
            highlight: function (code) {
                return highlight.highlightAuto(code).value;
            }
        }))
        .pipe(applyTemplate(config.templates.main, config.googleAnalyticsId, languageData, translations))
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
