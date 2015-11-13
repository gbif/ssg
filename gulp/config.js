/*
Build configurations specifying where various folders are located and build to.
This is not intended to be modified by editors
*/

var dest = './example',
    src = './src';

module.exports = {
    src: src,
    dest: dest,
    content: './content/**/*.md',
    javascript: {
        main: src + '/js/script.js',
        src: [
            './node_modules/jquery/dist/**/jquery.js',
            './node_modules/lunr/lunr.js',
            src + '/js/**/*.js'
        ],
        folder: src + '/js/**/*.*',
        dest: dest + '/javascript'
    },
    images: {
        src: './images/**',
        dest: dest + '/images'
    },
    fonts: {
        src: './fonts/ssgbase/fonts/**/*.*',
        dest: dest + '/css/fonts'
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
