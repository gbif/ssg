var gulp = require('gulp'),
    config = require('../config'),
    gbif_i18n = require('../../gbif_i18n/index.js')(config);

gulp.task('i18n', [], gbif_i18n);