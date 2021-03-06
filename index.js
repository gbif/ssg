var gulp = require('gulp'),
    requireDir = require('require-dir'),
    runSequence = require('run-sequence');

module.exports = (function(){
    requireDir('gulp/tasks', {recurse: true});
    function developmentTask (callback) {
        runSequence(
            ['clean-all'],
            ['fonts'],
            ['build-root', 'js', 'stylus', 'images', 'raw', 'favicons', 'translations'],
            ['error404'],
            ['watch'],
            callback);
    }

    function productionTask (callback) {
        runSequence(
            ['clean-all'],
            ['fonts'],
            ['build-root', 'js', 'stylus', 'images', 'raw', 'favicons', 'translations'],
            ['error404'],
            ['optimize'],
            callback);
    }

    return {
        developmentTask: developmentTask,
        productionTask: productionTask
    }
})();
