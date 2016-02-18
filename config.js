/*
Build configurations specifying where various folders are located and build to.
This is not intended to be modified by editors
*/
var path = require('path'),
    _ = require('lodash'),
    overwriteConf = require(path.resolve('./config.js')),
    dest = overwriteConf.dest || './dist',
    base = getPath('./'),
    src = './src',
    fullSrcPath = path.join(base, 'src'),
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
        src: [],
        dest: dest + '/javascript'
    },
    images: {
        src: src + '/images/**',
        dest: dest + '/images'
    },
    fonts: {
        src: './iconfont/**/*.*',
        dest: dest + '/css/fonts/iconfont/',
        iconsSrc: '',
        iconfontBuildDest: './iconfont/',
        template: '',
        templateDest: src + '/stylus/iconfont/'
    },
    stylus: {
        src: src + '/stylus/**/*.styl', //for the css in the specific site that might overwrite the core
        coresrc: fullSrcPath + '/stylus/**/*.styl', //for the css in core to watch
        entries: [src + '/stylus/index.styl'], //main entry point to build css from, will be overwritten by individual sites
        rawCss: [],//in case we want to add additional css from external libs
        dest: dest + '/css' //where to build to
    },
    browserSync: {
        server: {
            // Serve up our build folder
            baseDir: dest
        }
    },
    templates: {
        src: fullSrcPath + '/templates/**/*.html',
        main: fullSrcPath + '/templates/main.html'
    },
    clean: {
        all: [dest + '/**/*.*', './iconfont/**/*.*', src + '/stylus/iconfont/'],
        html: [dest + '/**/*.html'],
        css: [dest + '/**/*.css']
    },
    raw: {
        src: src + '/raw/**/*.*',
        dest: dest + '/raw'
    },
    favicons: {
        src: src + '/favicons/**/*.*',
        dest: dest
    }
};

conf = _.merge(conf, overwriteConf);

//console.log(conf);
module.exports = conf;
