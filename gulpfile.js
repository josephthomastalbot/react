// grab our gulp packages
var gulp  = require('gulp'),
    gutil = require('gulp-util'),
    sass = require('gulp-sass'),
    babel = require('gulp-babel'),
    concat = require('gulp-concat');

gulp.task('sass', function () {
	gulp.src(['./sass/variables.scss','./sass/mobiledefault.scss', './sass/tablet.scss', './sass/desktop.scss', './sass/widescreen.scss', './sass/search.scss',])
    .pipe(sass.sync().on('error', sass.logError))	//error check
    .pipe(sass({outputStyle: 'compressed'}))		//minify
    .pipe(concat('style.min.css'))					//concatenate
    .pipe(gulp.dest('./css'));						//destination
});

gulp.task("babel", function(){
    return gulp.src("./jsx/*.jsx").
        pipe(babel({
            plugins: ['transform-react-jsx']
        })).
        pipe(gulp.dest("./js"));
});

gulp.task('default', function () {
    gulp.watch('./sass/**/*.scss', ['sass']),       //watch all scss files
    gulp.watch('./jsx/**/*.jsx', ['babel']);       // watch jsx files here too
});