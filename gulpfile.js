const { src, dest, series, watch } = require('gulp')
const concat = require('gulp-concat')
const htmlMin = require('gulp-htmlmin')
const autoprefixer = require("gulp-autoprefixer")
const cleanCSS = require("gulp-clean-css")
const svgSprite = require("gulp-svg-sprite")
const babel = require('gulp-babel')
const notify  = require('gulp-notify')
const uglify = require('gulp-uglify-es').default
const sourcemaps = require('gulp-sourcemaps')
const del = require('del');

const browserSync = require("browser-sync").create()



const clean = () => {
    return del(['dist']);
  };

const resources = () => {
    return src('src/resources/**')
        .pipe(dest('dist'))
}



const styles = () => {
    return src('src/styles/**/*.css')
        .pipe(sourcemaps.init())
        .pipe(concat('main.css'))
        .pipe(autoprefixer({
            cascade: false,
        }))
        .pipe(cleanCSS({
            level:2
        }))
        .pipe(sourcemaps.write())
        .pipe(dest('dist'))
        .pipe(browserSync.stream())

}

const htmlMinify = () => {
    return src('src/**/*.html')
        .pipe(htmlMin({
            collapseWhitespace: true,
        }))
        .pipe(dest('dist'))
}


const svgSprites = () => {
    return src('src/images/svg/**/*.svg')
    .pipe (svgSprite({
      mode:{
        stack: {
          sprite:'../sprite.svg'
        }
      }
    }))
    .pipe (dest('dist/images'))
  }


const scripts = () => {
    return src([
        'src/js/components/**/*.js',
        "src/js/main.js"
    ])
    .pipe(sourcemaps.init())
    .pipe(babel({
        presets: ['@babel/env']
    }))
    .pipe(concat('app.js'))
    .pipe(uglify({
        toplevel: true
    }).on('error', notify.onError()))

    .pipe(sourcemaps.write())
    .pipe(dest('dist'))
    .pipe(browserSync.stream())
}


const watchfiles = () => {
    browserSync.init({
        server:{
            baseDir: 'dist'
        }
    })
}

const images = () => {
    return import('gulp-image')
    .then((gulpImage) => {
        return src([
        'src/images/**/*jpg',
        'src/images/**/*png',
        'src/images/*.svg',
        'src/images/**/*jpeg',
    ])
    .pipe(gulpImage.default())
    .pipe(dest('dist/images'));
    })
    .catch((error) => {
        console.error('Error during dynamic import of gulp-image:', error);
  });
};


watch('src/**/*.html', htmlMinify)
watch('src/styles/**/*.css', styles)
watch('src/images/svg/**/*.svg', svgSprites)
watch('src/js/**/*.js', scripts)
watch('src/resources/**', resources)



exports.styles = styles
exports.scripts = scripts
exports.htmlMinify = htmlMinify
exports.default = series(clean, resources, htmlMinify, scripts, styles, svgSprites, images, watchfiles)