var gulp = require('gulp'),
    plugins = require('gulp-load-plugins')();
    
var browserSync = require('browser-sync').create(),
    reload = browserSync.reload;

var rem = require('../index');

var staticBase = './';

var cssSrc = `${staticBase}less`;
var cssDst = `${staticBase}css`;


gulp.task('build-css', function() {
    return gulp.src([cssSrc + '/*.less', cssSrc + '/**/*.less'])
        .pipe(rem({
            width: 640,
            unit: 'pm'
        }))
        .pipe(plugins.less())
        .pipe(plugins.autoprefixer({
            browsers: [
                'ie >= 9',
                'ff >= 10',
                'chrome >= 20',
                'safari >= 7',
                'opera >= 10',
                'ios >= 7',
                'android >= 2.3'
            ]
        }))
        .pipe(gulp.dest(cssDst))
        .pipe(reload({
            stream: true
        }));
});

gulp.task('server', ['build-css'], function() {
    browserSync.init({
        server: "./"
    });

    gulp.watch([cssSrc + '/*.less', cssSrc + '/**/*.less'], ['build-css']);
});

gulp.task('default', ['build-css'], function() {
    console.log('Build all files finish.');
});


gulp.task('watch', function() {
    gulp.watch([cssSrc + '/*.less', cssSrc + '/**/*.less'], ['build-css']).on('change', function(event) {
        console.log('Event type: ' + event.type);
        console.log('Event path: ' + event.path);
    });
});





