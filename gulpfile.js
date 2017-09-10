var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "app"
        }
    });
});

gulp.task('sass', function() {
	return gulp.src('app/scss/main.scss')
	.pipe(sass().on('error', sass.logError))
	.pipe(autoprefixer())
	.pipe(gulp.dest('app/css'))
	.pipe(browserSync.stream());
});


gulp.task('watch',  ['browser-sync', 'sass'], function() {
  return gulp
    .watch('app/scss/main.scss', ['sass'])
    .on('change', function(event) {
      console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });
});

gulp.task('default', ['sass', 'browser-sync', 'watch',]);
