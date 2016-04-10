
var gulp = require('gulp');
var gls = require('gulp-live-server');
var browserify = require('gulp-browserify');
var karmaServer = require('karma').Server;

gulp.task('test', function (done) {
    new karmaServer({
        configFile: __dirname + '/karma.conf.js',
        singleRun: true
    }, done).start();
});

gulp.task('browserify', function () {
    gulp.src('public/js/index.js')
        .pipe(browserify({ debug: true }))
        .pipe(gulp.dest('public'))
});

gulp.task('serve', ['browserify'], function () {
    var server = gls.static(['public', 'node_modules'], 3000);
    server.start();

    var notify = function (file) {
        server.notify.apply(server, [file]);
    };

    gulp.watch([
        'public/index.js',
        'public/**/*.html',
        'public/**/*.css',
        'public/**/*.jpe?g',
        'public/**/*.png',
        'public/**/*.gif',
        'public/**/*.svg'
    ], notify);

    gulp.watch(['public/js/**/*.js'], ['browserify']);
});