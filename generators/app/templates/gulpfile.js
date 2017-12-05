var gulp = require('gulp');
var gutil = require('gulp-util');
var babel = require("gulp-babel");
var concat = require('gulp-concat');
var rename = require('gulp-rename');
const stylus = require('gulp-stylus');
const uglify = require('gulp-uglify');
const strip = require('gulp-strip-comments');
const allFiles = require('./loadJs.js');
const htmlmin = require('gulp-htmlmin');
const imagemin = require('gulp-imagemin');
const es = require('event-stream');
const gulpif = require('gulp-if');
var browserSync = require('browser-sync').create();
const reload = browserSync.reload;
const ENV = process.env.npm_lifecycle_event;
const isBuilding = ENV === 'build' || ENV === 'test';
var runSeq = require('run-sequence');

const exec = require('child_process').exec;

const currentTask = process.argv[process.argv.length - 1];

//Tarefa para rodar na produção o gulp
gulp.task('heroku:production', function(){
  runSeq('htmlMin', 'cssMin', 'jsMin', 'imgMin');
})

//Cria uma task só para observar a mudança nos arquivos, para live reload
gulp.task('default', ['build'], () => {
  browserSync.init({
    server: {
      baseDir: ['./dist/']
    }
  });

  gulp.watch([
    './src/*.html',
    './src/app/modules/**/*.html'
  ], ['htmlMin']);

  gulp.watch([
    './src/app/**/*.js',
    './src/app/modules/**/*.js'
  ], ['jsMin']);
});

//task central que chama as demais em suas respectivas ordens
gulp.task('build', ['htmlMin', 'cssMin', 'jsMin', 'imgMin']);

//mimificação de html
gulp.task('htmlMin', () => {
  return gulp.src([
    './src/index.html',
    './src/**/*.html'
  ])
    .pipe(gulpif(isBuilding, htmlmin({collapseWhitespace: isBuilding})))
    .pipe(gulp.dest('dist'))
    .on('end', reload);
});

//mimificação de imagens
gulp.task('imgMin', () => gulp.src('./src/img/**/*')
  .pipe(gulpif(isBuilding, imagemin()))
  .pipe(gulp.dest('./dist/img')))
  .on('end', reload);

//mimificacáo de js
gulp.task('jsMin', () => {
  return allFiles
    .list()
    .then(files => {
      return es.merge([
        gulp.src(allFiles.assets),
        gulp.src(files)
          .pipe(babel())
          .pipe(gulpif(isBuilding, uglify({comments: isBuilding})))
          .pipe(concat('data.min.js'))
      ])
        .pipe(concat('all.min.js'))
        .pipe(gulpif(isBuilding, strip()))
        .pipe(gulp.dest('dist'))
        .on('end', reload);
    });
});

//mimificação de css
gulp.task('cssMin', () => {
  return es.merge([
    gulp.src('./src/bower_components/angular-material/angular-material.min.css'),
    gulp.src('./src/style/style.css')
    .pipe(stylus({compress: isBuilding}))
    .pipe(gulp.dest('./src/style/'))
  ])
    .pipe(concat('style.css'))
    .pipe(gulp.dest('./dist/'))
    .on('end', reload);
});
