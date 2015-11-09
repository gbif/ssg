var renderer = require(__dirname + '/gbif_i18n/renderer/renderer'),
    validate = require(__dirname + '/gbif_i18n/helpers/validate'),
    applyTemplate = require('./gbif_i18n/gulp_plugins/applyTemplate'),
    filter = require(__dirname + '/gbif_i18n/gulp_plugins/filter'),
    build = require(__dirname + '/gbif_i18n/gulp_plugins/i18n_build'),
    getYamlFile = require(__dirname + '/gbif_i18n/helpers/getYml'),
    lunr = require(__dirname + '/gbif_i18n/gulp_plugins/gulp-lunr');

module.exports = {
    plugins: {
        applyTemplate: applyTemplate,
        filter: filter,
        build: build,
        lunr: lunr
    },
    renderer: renderer,
    helpers: {
        validate: validate,
        getYamlFile: getYamlFile
    }
};
