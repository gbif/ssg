/*
Build configurations specifying where various folders are located and build to.
This is not intended to be modified by editors
*/
var path = require('path'),
    _ = require('lodash'),
    overwriteConf = require(path.resolve('./config.js')),
    dest = overwriteConf.dest || './example',
    base = getPath('./'),
    src = path.join(base, 'src'),
    conf;

function getPath(p){
    return path.resolve(path.join(__dirname, p));
}

conf = {
    src: src,
    dest: dest,
    content: './content/**/*.md',
    languageFile: './content/languages.yml',
    javascript: {
        main: src + '/js/script.js',
        src: [
            path.join(base, 'node_modules/jquery/dist/**/jquery.js'),
            path.join(base, 'node_modules/lunr/lunr.js'),
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
        src: path.join(base, 'fonts/ssgbase/fonts/**/*.*'),
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
        main: src + '/templates/main.html'
    },
    clean: {
        all: [dest + '/**/*.*'],
        html: [dest + '/**/*.html'],
        css: [dest + '/**/*.css']
    },
    raw: {
        src: src + '/raw/**/*.*',
        dest: dest + '/raw'
    },
    customJavascript: {
        src: [],
        watch: undefined
    },
    customStylus: {
        variables: undefined,
        main: undefined
    },
    customTemplates: {
        src: undefined
    }
};

conf = _.merge(conf, overwriteConf);
conf.javascript.src = conf.javascript.src.concat(conf.customJavascript.src);

//console.log(conf);
module.exports = conf;
