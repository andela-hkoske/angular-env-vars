var ENV = process.env.ENV || 'development';
if (ENV === 'development') {
  require('dotenv').load();
}
var gulp = require('gulp'),
  jade = require('gulp-jade'),
  less = require('gulp-less'),
  bower = require('gulp-bower'),
  browserify = require('browserify'),
  browserSync = require('browser-sync'),
  gutil = require('gulp-util'),
  source = require('vinyl-source-stream'),
  ngConfig = require('gulp-ng-config'),
  path = require('path'),
  fs = require('fs'),
  config = require('./config.js'),
  paths = {
    public: {
      path: 'public/',
      script: './public/js/',
      lib: './public/lib/'
    },
    app: {
      jade: ['!app/shared/**', 'app/**/*.jade'],
      styles: 'app/styles/*.+(less|css)',
      staticFiles: [
        '!app/**/*.+(less|css|js|jade)',
        '!app/images/**/*',
        'app/**/*.*'
      ],
      scripts: {
        app: './app/scripts/application.js',
        all: './app/scripts/**/*.js'
      }
    }
  },
  makeJson = function(env, filePath) {
    fs.writeFileSync(filePath,
      JSON.stringify(env));
  };

gulp.task('ng-config', function() {
  makeJson(config[ENV], './config.json');
  gulp.src('./config.json')
    .pipe(
      ngConfig('ngEnvVars.config', {
        constants: config[ENV],
        createModule: false
      })
    )
    .pipe(gulp.dest('./app/scripts/'))
});

gulp.task('browser-sync', ['build', 'watch'], function() {
  browserSync({
    server: {
      baseDir: 'public/'
    }
  });
});

gulp.task('jade', function() {
  gulp.src(paths.app.jade)
    .pipe(jade())
    .pipe(gulp.dest(paths.public.path));
});

gulp.task('less', function() {
  gulp.src(paths.app.styles)
    .pipe(less({
      paths: [path.join(__dirname, './app/styles')]
    }))
    .pipe(gulp.dest('./public/css'));
});

gulp.task('bower', function() {
  return bower({ 'directory': paths.public.lib });
});

gulp.task('browserify', ['ng-config'], function() {
  return browserify(paths.app.scripts.app).bundle()
    .on('success', gutil.log.bind(gutil, 'Browserify Rebundled'))
    .on('error', gutil.log.bind(gutil, 'Browserify ' +
      'Error: in browserify gulp task'))
    .pipe(source('application.js'))
    .pipe(gulp.dest('./public/js/'));
});

gulp.task('watch', ['build'], function() {
  gulp.watch(paths.app.jade, ['jade']);
  gulp.watch(paths.app.styles, ['less']);
  gulp.watch(paths.app.scripts.all, ['browserify']);
});

gulp.task('build', ['ng-config', 'jade', 'less', 'browserify', 'bower']);
gulp.task('default', ['browser-sync', 'watch', 'build']);
