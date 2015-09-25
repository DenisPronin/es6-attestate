var gulp = require("gulp");
var babel = require("gulp-babel");
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var connect = require('gulp-connect');

var paths = {
    html: {
        src: ['index.html']
    },
    js: {
        src: ['js/**/*.js'],
        distPath: 'dist'
    }
};

var port = 5051;

gulp.task('connect', function() {
    connect.server({
        root: [__dirname],
        port: port,
        livereload: true
    });
});

gulp.task('html', function() {
    return gulp.src(paths.html.src)
        .pipe(connect.reload());
});

gulp.task('js', function () {
    return gulp.src(paths.js.src)
        .pipe(sourcemaps.init())
        .pipe(babel())
        .on('error', function(e) {
            console.log('>>> ERROR', e);
            // emit here
            this.emit('end');
        })
        .pipe(concat('bundle.js'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist'))
        .pipe(connect.reload());
});

gulp.task('watch', function () {
    gulp.watch(paths.html.src, ['html']);
    gulp.watch(paths.js.src, ['js']);
});

gulp.task('default', ['connect', 'js', 'watch']);
