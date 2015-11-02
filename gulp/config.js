var navigation = require('./navigation-config'),
    dest = './build',
    src = './src';

module.exports = {
    src: src,
    dest: dest,
    content: './content/**/*.md',
    navigation: navigation, 
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
    inject: {
        cssSrc: dest + '/**/*.css',
        jsMain: [dest + '/**/*.js', , '!' + dest + '/**/ie/**/*.js'],
        jsIE: dest + '/**/ie/**/*.js',
        dest: dest,
        ignore: '/dist' //TODO should be dependent on destination
    },
    clean: {
        all: [dest + '/**/*.*'],
        html: [dest + '/**/*.html'],
        css: [dest + '/**/*.css']
    }
};
