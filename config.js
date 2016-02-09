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
            './node_modules/jquery/dist/**/jquery.js',
            './node_modules/lunr/lunr.js',
            src + '/js/helpers.js',
            src + '/js/**/*.js'
        ],
        layout: [src + '/js/helpers.js', src + '/js/a11y.js', src + '/js/navigation.js'],
        folder: src + '/js/**/*.*',
        dest: dest + '/javascript'
    },
    images: {
        src: './images/**',
        dest: dest + '/images'
    },
    fonts: {
        src: path.join(base, 'fonts/**/*.*'),
        dest: dest + '/css/fonts'
    },
    stylus: {
        src: src + '/stylus/**/*.styl', //for the css in the specific site that might overwrite the core
        coresrc: src + '/stylus/**/*.styl', //for the css in core to watch
        entries: [src + '/stylus/documentation.styl'], //main entry point to build css from, will be overwritten by individual sites
        rawCss: [base + '/node_modules/highlight.js/styles/tomorrow.css'],
        dest: dest + '/css' //where to build to
    },
    browserSync: {
        server: {
            // Serve up our build folder
            baseDir: dest
        }
    },
    templates: {
        src: src + '/templates/**/*.html',
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
    customTemplates: {
        src: undefined
    }
};

conf = _.merge(conf, overwriteConf);
conf.javascript.src = conf.javascript.src.concat(conf.customJavascript.src);

//console.log(conf);
module.exports = conf;
