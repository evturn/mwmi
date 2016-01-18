'use strict';
const gulp = require('gulp');
const $ = require('gulp-load-plugins')();

var paths = {
  'src':['./models/**/*.js','./routes/**/*.js', 'keystone.js', 'package.json']
};

const opts = {
  plumber: {
    errorHandler: function(err) {
      $.util.beep();
      console.log(err);
      $.notify(err);
      this.emit('end');
    }
  },
  notify: {
    eslint: (file) => {
      if (file.eslint.errorCount === 0) {
        return;
      }

      let errors = file.eslint.messages.map((data) => {
        let location = `Line: ${data.line}:${data.column} |\n${data.message}`;
        return location;
      });

      let message = `File: ${file.relative} (${file.eslint.errorCount} errors)\n${errors}\n`;
      return message;
    }
  },
  autoprefixer: {
    browsers: [
      '> 1%',
      'last 2 versions',
      'firefox >= 4',
      'safari 7',
      'safari 8',
      'IE 8',
      'IE 9',
      'IE 10',
      'IE 11'
    ],
    cascade: false
  }
}


gulp.task('default', ['less', 'less:watch']);

gulp.task('less:watch', () => {
  gulp.watch('public/styles/less/**/*.less', ['less']);
});

gulp.task('less', () => {
  return gulp.src('public/styles/less/main.less')
    .pipe($.plumber(opts.plumber))
    .pipe($.less())
    .pipe($.autoprefixer(opts.autoprefixer))
    .pipe(gulp.dest('public/styles/css'))
    .on('error', opts.plumber.errorHandler);
});

// gulp watcher for lint
gulp.task('eslint', () => {
  return gulp.src(paths.eslint.src)
    .pipe($.plumber(opts.plumber))
    .pipe($.eslint())
    .on('error', opts.plumber.errorHandler)
    .pipe($.eslint.format('stylish'))
    .pipe($.notify(opts.notify.eslint));
});
