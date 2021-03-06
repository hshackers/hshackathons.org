var gulp = require('gulp'),
    less = require('gulp-less'),
    path = require('path'),
    prefix = require('gulp-autoprefixer'),
    minifyCSS = require('gulp-minify-css')
    server = require('tiny-lr')(),
    plumber = require('gulp-plumber'),
    livereload = require('gulp-livereload');

gulp.task('styles', function() {
    gulp
        .src('css/less/main.less')
        .pipe(plumber())
        .pipe(less({
            paths: [path.join(__dirname, 'less')]
        }))
        .pipe(prefix("last 2 versions", "> 1%", "ie 8", "ie 7"))
        .pipe(minifyCSS())
        .pipe(gulp.dest('./css'))
        .pipe(livereload(server));
});

gulp.task('scripts', function() {
    gulp
        .src('js/*.js')
        .pipe(plumber())
        .pipe(livereload(server));
});

gulp.task('views', function() {
    gulp
        .src('*.html')
        .pipe(plumber())
        .pipe(livereload(server));
});

// The default task (called when you run `gulp`)
gulp.task('default', function() {
    server.listen(35729, function(err) {
        if (err) return console.log(err);
        gulp.watch('css/less/*.less', ['styles']);
        gulp.watch('js/*.js', ['scripts']);
        gulp.watch(['*.html','*.md','*.yaml'], ['views']);
    });
});
