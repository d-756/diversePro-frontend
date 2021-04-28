var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var autoprefixer = require('gulp-autoprefixer');
var plumber = require('gulp-plumber');
// var imagemin = require('gulp-imagemin');
var cssmin = require('gulp-cssmin');
var rigger = require('gulp-rigger');
// var rename = require('gulp-rename');
// var jsmin = require('gulp-uglify');
var jsmin = require('gulp-uglify-es').default;
var concat = require('gulp-concat');
var order = require("gulp-order");



gulp.task('online', ['sass', 'svg|png|jpg', 'jsmin', 'html'], function () {

    browserSync.init({
        port: 8081,
        open: true,
        notify: false,
        tunnel: false,
        proxy: 'localhost/diversepro'
    });

    gulp.watch('build/css/*.+(scss|css)', ['sass']);
    gulp.watch('build/images/*.+(svg|png|jpg)', ['svg|png|jpg']);
    gulp.watch('build/html/**/*.html', ['html']);
    gulp.watch('build/js/*.js', ['jsmin']);
});

gulp.task('sass', function () {
    gulp.src('build/css/*.+(scss|css)')
        .pipe(plumber())
        .pipe(order([
            '**/*',
            'main.scss'
        ]))
        .pipe(concat('main.min.css'))
        .pipe(sass({
            outputStyle: 'compressed'
        }))
        .pipe(sass({
            errLogToConsole: true
        }))
        .pipe(autoprefixer({
            browsers: ['last 50 versions'],
            cascade: false
        }))
        .pipe(cssmin())
        .pipe(gulp.dest('css/'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('jsmin', function () {
    gulp.src('build/js/*.js')
        .pipe(order([
            'jquery.min.js',
            "cleave.js",
            'lodash.min.js',
            'cloudinary-core.js',
            "wow.min.js",
            "croppie.js",
            "dropzone.js",
            "select2.full.js",
            "jquery.fancybox.min.js",
            'main.js',
            'api.js',
            'account-api.js',
            '*.js',
        ]))
        .pipe(concat('script.min.js'))
        .pipe(jsmin())
        .pipe(gulp.dest('js/'))
        .pipe(browserSync.reload({
            stream: true
        }));
});
// gulp.task('jsmin', function () {
//     gulp.src('build/jsmain/*.js')
//         .pipe(concat('main.min.js'))
//         .pipe(jsmin())
//         .pipe(gulp.dest('dest/js/'))
//         .pipe(browserSync.reload({stream:true}));
// });

gulp.task('svg|png|jpg', function () {
    gulp.src('build/images/*')
        // .pipe(imagemin({progressive: true}))
        .pipe(gulp.dest('images/'))
        .pipe(browserSync.reload({
            stream: true
        }));
});


gulp.task('html', function () {
    return gulp.src('build/html/pages/*.html')
        .pipe(rigger())
        .pipe(gulp.dest(''))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('default', ['online']);