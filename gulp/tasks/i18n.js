var gulp = require('gulp'),
    config = require('../config'),
    gbif_i18n = require('../../gbif_i18n/index.js')(config);

//Create the task that builds the actual html files based on the configuration object
gulp.task('i18n', [], gbif_i18n);