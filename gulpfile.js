import gulp from "gulp";
import plumber from 'gulp-plumber';
import {create as bsCreate} from 'browser-sync';
import pug from "gulp-pug";
import {deleteSync} from "del";

const browser = bsCreate();

export const pugConvert = () => {
  return gulp.src("src/*.pug", {base: "src"})
    .pipe(plumber())
    .pipe(pug({}))
    .pipe(gulp.dest("build"));
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
  gulp.watch("src/style/*.css", gulp.series(reload));
};

export default gulp.series(
  clean,
  copy,
  pugConvert,
  server,
  watcher,
);
