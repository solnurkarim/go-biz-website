var gulp = require("gulp");
var concatTo = require("gulp-concat");
var jsmin = require("gulp-babel-minify");
var sass = require("gulp-sass");
var cssmin = require("gulp-csso");
var combine = require("combined-stream");
var browserSync = require("browser-sync").create();
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var wait = require("gulp-wait");
var srcmaps = require("gulp-sourcemaps");

gulp.task("js", function() {
  let src = gulp.src("src/js/*.js");

  let vendors = gulp.src([
    "src/vendors/jquery-3.3.1.min.js",
    "src/vendors/owl.carousel.min.js"
  ]);

  let all = combine.create();
  all.append(vendors);
  all.append(src);

  return all
    .pipe(srcmaps.init())
    .pipe(concatTo("all.min.js"))
    .pipe(srcmaps.write())
    .pipe(gulp.dest("dist/js"))
    .pipe(browserSync.stream());
});

gulp.task("css", function() {
  let src = gulp
    .src("src/scss/*.scss")
    .pipe(wait(200))
    .pipe(sass().on("error", sass.logError))
    .pipe(cssmin())
    .pipe(
      postcss([
        autoprefixer({
          browsers: [">5%", "last 2 versions"]
        })
      ])
    );

  let vendors = gulp.src(["src/vendors/owl.carousel.min.css"]);

  let all = combine.create();
  all.append(vendors);
  all.append(src);

  return all
    .pipe(concatTo("all.min.css"))

    .pipe(gulp.dest("dist/css"))
    .pipe(browserSync.stream());
});

gulp.task("default", ["css", "js"], function() {
  browserSync.init({
    server: { baseDir: "./dist" }
  });

  gulp.watch("src/js/**/*.js", ["js"]);
  gulp.watch("src/scss/**/*.scss", ["css"]);
  gulp.watch("dist/*.html").on("change", browserSync.reload);
});
