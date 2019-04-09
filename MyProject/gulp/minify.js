const gulp = require('gulp');
const concat = require('gulp-concat');
// MINIFY CSS

const cssnano = require('gulp-cssnano');

gulp.src(['public/css/styles.css', 'public/css/keyframes.css', 'public/css/media.css'])
.pipe(concat('styles.css'))
.pipe(cssnano({discardComments:{removeAll:true}}))
.pipe(gulp.dest("public/dist/css"));

// MINIFY JS
var uglify = require('gulp-uglify')

  gulp.task('scripts', function() {
    return gulp.src(['public/js/tasks/cache.js', 'public/js/tasks, handtrack.js'])
      // Minify the file
      .pipe(uglify())
      // Output
      .pipe(gulp.dest('/public/dist/js'))
    });

    console.log('minified')

