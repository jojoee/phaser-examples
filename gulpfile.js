var gulp        = require('gulp');
var browserSync = require('browser-sync').create();

gulp.task('serve', function() {
  browserSync.init({
    'server': './',
    'startPath': '/games/',
    'open': true
  });

  gulp.watch('./games/**/index.html').on('change', browserSync.reload);
  gulp.watch('./games/**/js/*.js').on('change', browserSync.reload);
});

gulp.task('default', ['serve']);
