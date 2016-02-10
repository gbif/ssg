var gulp = require('gulp'),
    requireDir = require('require-dir'),
    runSequence = require('run-sequence');

module.exports = (function(){
    requireDir('gulp/tasks', {recurse: true});
    function developmentTask (callback) {
        runSequence(
            ['clean-all'],
            ['build-root', 'js', 'stylus', 'images', 'fonts', 'raw'],
            ['watch'],
            callback);
    }

    function productionTask (callback) {
        runSequence(
            ['clean-all'],
            ['build-root', 'js', 'stylus', 'images', 'fonts', 'raw'],
            callback);
    }

    return {
        developmentTask: developmentTask,
        productionTask: productionTask
    }
})();
