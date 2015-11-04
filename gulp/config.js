/*
Build configurations specifying where various folders are located and build to.
This is not intended to be modified by editors
*/

var navigation = require('./navigation-config'),
    dest = './build',
    src = './src';

module.exports = {
    src: src,
    dest: dest,
    content: './content/**/*.md',
    navigation: navigation,
    lunr: {
        dest: dest + '/lunr'
    },
    javascript: {
        main: src + '/js/script.js',
        src: [src + '/js/**/*.js', '!' + src + '/js/ie8.js'],
        folder: src + '/js/**/*.*',
        dest: dest + '/javascript'
    },
    stylus: {
        src: src + '/stylus/**/*.styl',
        entries: src + '/stylus/index.styl',
        dest: dest + '/css'
    },
    browserSync: {
        server: {
            // Serve up our build folder
            baseDir: dest
        }
    },
    templates: {
        src: src + '/templates/**/*.html'
    },
    clean: {
        all: [dest + '/**/*.*'],
        html: [dest + '/**/*.html'],
        css: [dest + '/**/*.css']
    }
};
