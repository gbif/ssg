var gulp = require('gulp'),
	runSequence = require('run-sequence'),
	path = require('path'),
    validate = require('./helpers/validate'),
    getYamlFile = require('./helpers/getYml'),
    ssg_i18n_build = require('./ssg_i18n_build');

// Create gulp tasks based on configuration object. A prettier way might be to just use the gulp-plugins
// as we do in this task, but that would make updating all sites more cumbersome if we need to make changes beyond the plugin.
// So for now it is registered as a task.
module.exports = function (conf) {

    //get language file
    var langFileName = './content/languages.yml',// TODO Hardcoded language file location
        languageData = getYamlFile(langFileName);
    validate.validateLanguageFile(languageData, langFileName); //make sure that the language file is on the correct format
    languageData.list = Object.keys(languageData.languages).map(function (lang) { //create list of language keys. only because it makes it easier to iterate elsewhere
        return lang;
    });

    //task to build html and search indices
    gulp.task('gbif-ssg-i18n--main', [], ssg_i18n_build(conf, languageData));

    // Once site is build then copy main language version to root.
    gulp.task('gbif-ssg-i18n--root', [], function () {
        return gulp.src(path.join(conf.dest, languageData.list[0], '/index.html'))
            .pipe(gulp.dest(conf.dest));
    });

    return function (callback) {
        runSequence(
            ['gbif-ssg-i18n--main'],
            ['gbif-ssg-i18n--root'],
            callback);
    }
};
