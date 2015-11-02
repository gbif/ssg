var gulp = require('gulp');
var del = require('del');
var config = require('../config').clean;

gulp.task('clean-all', function (cb) {
      del(config.all).then(function (paths) {
	    cb();
	});
});

gulp.task('clean-html', function (cb) {
      del(config.html).then(function (paths) {
	    cb();
	});
});
