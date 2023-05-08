const { src, dest, series, watch } = require('gulp')
const concat = require('gulp-concat')


const styles = () => {
    return src('src/styles/**/*.css')
        .pipe(concat('main.css'))
        .pipe(dest('dist'))
}

exports.styles = styles