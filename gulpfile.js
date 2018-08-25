var gulp = require ('gulp');
var sass = require ('gulp-sass');
var htmlmin = require('gulp-htmlmin');
var browserSync = require('browser-sync').create();



gulp.task('sass', function () {
    return gulp.src('./source/scss/**/*.scss')
        .pipe(sass({ outputStyle: 'compressed' })) //Compila e minifica o Sass
        .pipe(gulp.dest('./dist/css/'))
        .pipe(browserSync.stream());
});

gulp.task('minify', function () {
    return gulp.src('./source/*.html')
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest('dist'));
});

gulp.task('server', function () {
    browserSync.init({
        server: {
            baseDir: "./dist/"
        }
    });

    gulp.watch("./source/scss/**/*.scss", ['sass']);
    gulp.watch("./source/*.html",['minify']).on('change', browserSync.reload);
});

gulp.task('default', ['server','sass','minify']);