var through = require('through2'),
    gutil = require('gulp-util');

/*
Test that language configuration file is in the correct format. Example
languages:
  - englishName: english
    abbr: en
    presentation: english
  - englishName: danish
    abbr: dk
    presentation: dansk
*/
function validateLanguageFile(data, fileName) {
    var languageFile = fileName ? fileName : '';
    console.log(data);
    if (Object.prototype.toString.call(data) !== '[object Object]' || Object.keys(data).length < 1)  {
        var errorString = 'Wrong format in language file ' + languageFile + '. The language file must be a dictionary of "languages:" of type "abbrivation": "local presentation name". E.g. en: english';
        throw new gutil.PluginError('gbif-ssg-i18n', errorString);
    }
}

module.exports = {
    validateLanguageFile: validateLanguageFile
}