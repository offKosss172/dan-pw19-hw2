const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const imagemin = require('gulp-imagemin');
const del = require('del');
const browserSync = require('browser-sync').create();

const paths = {
  styles: {
    src: [
      'src/scss/**/*.scss',
      '!src/scss/responsive.scss' // Виключаємо responsive.scss з основного шляху
    ],
    responsive: 'src/scss/responsive.scss', // Окремий шлях для responsive.scss
    dest: 'dist/css'
  },
  scripts: {
    src: 'src/js/**/*.js',
    dest: 'dist/js'
  },
  images: {
    src: 'src/img/**/*',
    dest: 'dist/img'
  }
};

function clean() {
  return del(['dist']);
}

function styles() {
  return gulp.src([...paths.styles.src, paths.styles.responsive]) // Додаємо окремий шлях для responsive.scss
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(cleanCSS())
    .pipe(concat('styles.min.css'))
    .pipe(gulp.dest(paths.styles.dest))
    .pipe(browserSync.stream());
}

function scripts() {
  return gulp.src(paths.scripts.src)
    .pipe(concat('scripts.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(paths.scripts.dest))
    .pipe(browserSync.stream());
}

function images() {
  return gulp.src(paths.images.src)
    .pipe(imagemin())
    .pipe(gulp.dest(paths.images.dest));
}

function watch() {
  browserSync.init({
    server: {
      baseDir: './'
    }
  });

  gulp.watch(paths.styles.src, styles);
  gulp.watch(paths.scripts.src, scripts);
  gulp.watch(paths.images.src, images);
  gulp.watch('./*.html').on('change', browserSync.reload);
}

const build = gulp.series(clean, gulp.parallel(styles, scripts, images));
const dev = gulp.series(build, watch);

exports.build = build;
exports.dev = dev;
exports.default = dev;
