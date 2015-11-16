var requireDir = require('require-dir'),
    runSequence = require('run-sequence');

module.exports = (function(){
    requireDir('./gulp/tasks', {recurse: true});
    function developmentTask (callback) {
        runSequence(
            ['clean-all'],
            ['build-root', 'js', 'stylus', 'images', 'fonts'],
            ['watch'],
            callback);
    }
    return developmentTask;
})();
