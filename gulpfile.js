import gulp from "gulp";
import rename from 'gulp-rename';
import plumber from 'gulp-plumber';
import sass from 'gulp-dart-sass';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import csso from 'postcss-csso';
import {create as bsCreate} from 'browser-sync';
import sourcemap from 'gulp-sourcemaps';
import pug from 'gulp-pug';
import pugLinter from 'gulp-pug-linter';
import pugLintStylish from 'puglint-stylish';
import {deleteSync} from "del";

const browser = bsCreate();

export const pugConvert = () => {
  return gulp.src("src/*.pug", {base: "src"})
    .pipe(plumber())
    .pipe(pug({}))
    .pipe(gulp.dest("build"));
};

export const style = () => {
  return gulp.src("src/sass/style.scss", {sourcemap: true})
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([
      autoprefixer(),
      csso()
    ]))
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest("build/style", {sourcemap: '.'}))
    .pipe(browser.stream());
};

export const clean = async () => {
  return deleteSync("build");
};

export const copy = (done) => {
  gulp.src([
    "src/img/**/*.{png,jpg,svg,webp,avif}",
  ], {
    base: "src"
  })
    .pipe(gulp.dest("build"))
  done();
}

export const server = (done) => {
  browser.init({
    server: {
      baseDir: "build",
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
};

export const reload = (done) => {
  browser.reload();
  done();
};

export const watcher = () => {
  gulp.watch("src/*.pug", gulp.series(pugConvert, reload));
  gulp.watch("src/**/*.pug", gulp.series(pugConvert, reload));
  gulp.watch("src/sass/**/*.scss", gulp.series(style, reload));
};

export const puglint = () => {
  return gulp.src("src/*.pug")
    .pipe(plumber())
    .pipe(pugLinter({failAfterError: true, reporter: pugLintStylish}))
};

export default gulp.series(
  clean,
  copy,
  style,
  pugConvert,
  server,
  watcher,
);
