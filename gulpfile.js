const { src, dest, watch, series } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const prefix = require('gulp-autoprefixer');
const minify = require('gulp-clean-css');
const concat = require('gulp-concat');
const htmlmin = require('gulp-htmlmin');
const terser = require('gulp-terser');
const browserSync = require('browser-sync').create();

function compileScss() {
  return src('src/styles/**/*.scss')
    .pipe(sass())
    .pipe(prefix('last 2 versions'))
    .pipe(minify())
    .pipe(concat('styles.min.css'))
    .pipe(dest('src/styles'))
    .pipe(browserSync.stream());
}
function copyHtml() {
  return src('src/index.html')
    .pipe(
      htmlmin({
        removeComments: true,
      }),
    )
    .pipe(dest('build'));
}
function copyJs() {
  return src('src/js/*.js').pipe(terser()).pipe(dest('build/js'));
}
function copySvg() {
  return src('src/assets/svg/*.svg').pipe(dest('build/assets/svg'));
}
function copyStyles() {
  return src('src/styles/*.css').pipe(dest('build/styles'));
}
function copyImage() {
  return src('src/assets/raster/*{.jpg.jpeg,png}').pipe(dest('build/assets/raster'));
}

function server() {
  browserSync.init({
    server: {
      baseDir: './src/',
    },
  });
  watch('src/styles/**/*.scss', compileScss);
  watch('src/*.html').on('change', browserSync.reload);
  watch('src/js/**/*.js').on('change', browserSync.reload);
}

exports.server = series(compileScss, server);

exports.build = series(copyHtml, copyStyles, copySvg, copyJs, copyImage);
