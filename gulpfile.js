var gulp        = require('gulp');
var notify      = require('gulp-notify'); // unused
var browserSync = require('browser-sync').create();

var projectName;
// projectName = 'flappy-bird';
// projectName = 'space-hipster';
// projectName = 'tank';
// projectName = 'webfont';
// projectName = 'flappy-bird-2';
// projectName = 'doodle-jump';
// projectName = '2048';
// projectName = 'brick';
// projectName = 'move-the-box';
// projectName = 'platformer';
// projectName = 'platformer-2';
// projectName = 'car';
// projectName = 'pacman';
// projectName = 'pacman-2';
// projectName = 'shootout';
// projectName = 'bulletpool';
// projectName = 'pong';
// projectName = 'ascii-roguelike';
// projectName = 'digger';
projectName = 'monster-wants-candy';

/*================================================================
 # HELPER
 ================================================================*/

// unused
function handleError(err) {
  var msg = 'Error: ' + err.message;

  console.error('Error', err.message);
  browserSync.notify('Error: ' + err.message);

  var args = Array.prototype.slice.call(arguments);
  notify.onError({
    title: 'Compile Error',
    message: '<%= error.message %>'
  }).apply(this, args);

  if (typeof this.emit === 'function') this.emit('end')
}

/*================================================================
 # TASK
 ================================================================*/

gulp.task('serve', function() {
  browserSync.init({
    'server': './',
    'startPath': '/' + projectName,
    'open': true
  });

  gulp.watch('./' + projectName + '/**/*.html').on('change', browserSync.reload);
  gulp.watch('./' + projectName + '/**/*.js').on('change', browserSync.reload);
});

gulp.task('default', ['serve']);
