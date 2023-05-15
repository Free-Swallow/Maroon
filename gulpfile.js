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
import bemlinter from 'gulp-html-bemlinter';
import svgstore from 'gulp-svgstore';
import terser from 'gulp-terser';
import {deleteSync} from "del";

const browser = bsCreate();

// Compilation

export const markup = () => {
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

const scripts = () => {
  return gulp.src("src/js/*.js", {sourcemap: true})
    .pipe(terser())
    .pipe(rename("main.min.js"))
    .pipe(gulp.dest("build/js", {sourcemap: '.'}))
    .pipe(browser.stream());
};

//  Lint

export const puglint = () => {
  return gulp.src("src/*.pug")
    .pipe(plumber())
    .pipe(pugLinter({failAfterError: true, reporter: pugLintStylish}))
};

export const lintBemMarkup = () => {
  return gulp.src('build/*.html')
    .pipe(bemlinter());
};

//  Working with files

export const clean = async () => {
  return deleteSync("build");
};

export const copy = (done) => {
  gulp.src([
    "src/img/*.{png,jpg,svg,webp,avif}",
    "src/fonts/*.{woff2,woff}",
    "src/favicon/*.{png,ico,webmanifest,svg}",
  ], {
    base: "src"
  })
    .pipe(gulp.dest("build"))
  done();
}

//  Images

export const sprite = () => {
  return gulp.src("src/img/ico/*.svg")
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest("build/img"))
}

//  Server

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
  gulp.watch("src/**/*.pug", gulp.series(markup, reload));
  gulp.watch("src/sass/**/*.scss", gulp.series(style, reload));
  gulp.watch("src/js/*.js", gulp.series(scripts, reload));
};

export default gulp.series(
  clean,
  copy,
  sprite,
  style,
  scripts,
  markup,
  server,
  watcher,
);
