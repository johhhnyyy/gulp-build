const { src, dest, parallel, series, watch } = require('gulp'); 
const autoPrefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const sass = require('gulp-sass')(require('sass'));
const notify = require("gulp-notify");
const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync').create();
const fileinclude = require('gulp-file-include');


const styles = () => {
  return src('./src/scss/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({
      outputStyle: 'expanded'
    }).on('error', notify.onError()))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(autoPrefixer({
      cascade: false,
    }))
    .pipe(cleanCSS({
      leve: 2
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(dest('./app/css'))
    .pipe(browserSync.stream())
}

const htmlInclude = () => {
  return src(['./src/index.html'])
    .pipe(fileinclude({
      prefix: '@',
      basepath: '@file'
    }))
    .pipe(dest('./app'))
    .pipe(browserSync.stream());
}

const watchFiles = () => {
  browserSync.init({
    server: {
        baseDir: "./app"
    }
  });

  watch('./src/scss/**/*.scss', styles)
  watch('./src/index.html', htmlInclude);
}

exports.styles = styles;
exports.watchFiles = watchFiles;  