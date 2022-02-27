let project_folder = 'dist';
let source_folder = '#src';

let path = {
    build:{
        html:project_folder + '/',
        css:project_folder + '/assets/css/',
        js:project_folder + '/assets/js/',
        img:project_folder + '/assets/img/',
        fonts: project_folder + '/assets/fonts/',
    },
    src: {
        html:[source_folder + '/*.html', "!" + source_folder + '/_*.html'],
        css:source_folder + '/scss/styles.scss',
        js:source_folder + '/js/*.js',
        img:source_folder + '/img/**/*.{jpeg,jpg,png,svg,gif.ico.webp}',
        fonts: source_folder + '/fonts/*.ttf',
    },
    watch: {
        html:source_folder + '/**/*.html',
        css:source_folder + '/scss/*.scss',
        js:source_folder + '/js/**/*.js',
        img:source_folder + '/img/**/*.{jpg,png,svg,gif.ico.webp}',
    },
    clean: "./" + project_folder + "/"
}

let {src, dest} = require('gulp'),
    gulp = require('gulp'),
    fileinclude = require('gulp-file-include'),
    del = require('del'),
    scss = require('gulp-sass')(require('sass')),
    groupMedia = require('gulp-group-css-media-queries'),
    cleanCss = require('gulp-clean-css'),
    rename = require('gulp-rename'),
    uglifyJs = require('gulp-uglify-es').default,
    imageMin = require('gulp-imagemin'),
    ttf2woff = require('gulp-ttf2woff'),
    ttf2woff2 = require('gulp-ttf2woff2');

function html() {
    return src(path.src.html)
        .pipe(fileinclude())
        .pipe(dest(path.build.html))
}

function css() {
    return src(path.src.css)
        .pipe(
            scss({
                outputStyle: 'expanded'
            })
        )
        .pipe(groupMedia())
        .pipe(dest(path.build.css))
        .pipe(cleanCss())
        .pipe(
            rename({
                extname:'.min.css'
            })
        )
        .pipe(dest(path.build.css))
}

function js() {
    return src(path.src.js)
        .pipe(fileinclude())
        .pipe(dest(path.build.js))
        .pipe(uglifyJs())
        .pipe(
            rename({
                extname:'.min.js'
            })
        )
        .pipe(dest(path.build.js))
}

function img() {
    return src(path.src.img)
        .pipe(
            imageMin({
                progressive:true,
                svgPlugins: [{removeViewBox: false}],
                interfaced: true,
                optimizationLevel: 3
            })
        )
        .pipe(dest(path.build.img))
}

function font(params) {
    src(path.src.fonts)
        .pipe(ttf2woff())
        .pipe(dest(path.build.fonts))
    return src(path.src.fonts)
        .pipe(ttf2woff2())
        .pipe(dest(path.build.fonts))
}

function watchFiles() {
    gulp.watch([path.watch.html],html)
    gulp.watch([path.watch.css],css)
    gulp.watch([path.watch.js],js)
    gulp.watch([path.watch.img],img)
}

function clean() {
    return del(path.clean);
}


let build = gulp.series(clean,gulp.parallel(html,css,js,img,font))
let watch = gulp.parallel(build,watchFiles,clean)

exports.buld = build;
exports.font = font;
exports.html = html;
exports.css = css;
exports.js = js;
exports.img = img;
exports.watch = watch;
exports.default = watch;