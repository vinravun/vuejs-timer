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
  	gulp.watch('app/scss/**/*.scss', ['sass']);
  	gulp.watch('app/*.html', browserSync.reload); 
  	gulp.watch('app/js/**/*.js', browserSync.reload); 	
});

gulp.task('default', ['sass', 'browser-sync', 'watch',]);
