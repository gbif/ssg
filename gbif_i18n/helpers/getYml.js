/*
read yaml from file and returned data parsed as json
*/
var fs = require('fs'),
	gutil = require('gulp-util'),
	yaml = require('yaml-js');

//module.exports =  function(filePath, cb) {
//	"use strict";
//    fs.readFile(filePath, 'utf8', function (err,data) {
//        if (err) {
//        	var errorString = 'Cannot read yml file. Does the file exists? File: ' + filePath;
//        	throw new gutil.PluginError('gbif-ssg-i18n', errorString);
//            return console.log(err);
//        }
//        var parsedData = yaml.load(data);
//        cb(parsedData);
//    });
//}


module.exports =  function (filePath) {
    "use strict";
    var data, parsedData;
    try {
        data = fs.readFileSync(filePath, 'utf8');
        parsedData = yaml.load(data);
        return parsedData;
    } catch (e) {
        var errorString = 'Cannot read yml file. Does the file exists? Is it valid yml? File: ' + filePath;
        throw new gutil.PluginError('gbif-ssg-i18n', errorString);
        console.error(e);
    }
    return undefined;
}