'use strict';

const gulp = require('gulp');
const typescript = require('gulp-typescript');
const tscConfig = require('./tsconfig.json');
const shell = require('gulp-shell');
const tslint = require("gulp-tslint");
const sourcemaps = require('gulp-sourcemaps');

gulp.task('clean', function () {
    const del = require('del');
    return del('dist/**/*');
});

gulp.task('ts', function () {

    //return gulp
    //    .src('app/**/*.ts')
    //   .pipe(typescript(tscConfig.compilerOptions))
    //  .pipe(gulp.dest('dist'));

    const tsResult = gulp.src('app/**/*.ts')
        .pipe(sourcemaps.init())
        .pipe(typescript(tscConfig.compilerOptions));

    return tsResult.js
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest('dist'));

});

gulp.task('tslib', function () {
    return gulp
        .src('node_modules/angular2-localstorage/*.ts')
        .pipe(typescript(tscConfig.compilerOptions))
        .pipe(gulp.dest('node_modules/angular2-localstorage/'));
});

gulp.task('tslint', function () {
    return gulp.src('app/**/*.ts')
        .pipe(tslint())
        .pipe(tslint.report('verbose'));
});

gulp.task('html', function () {
    return gulp.src('app/**/*.html')
        .pipe(gulp.dest('dist'));
});

gulp.task('assets', function () {
    return gulp.src('app/assets/**/*').pipe(gulp.dest('dist/assets'));
});

gulp.task('scss', function () {
    const sass = require('gulp-sass');

    return gulp.src('app/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('dist'));
});

gulp.task('css', function () {
    return gulp.src('app/**/*.css')
        .pipe(gulp.dest('dist'));
});

gulp.task('json', function () {
    return gulp.src('app/**/*.json')
        .pipe(gulp.dest('dist'));
});

gulp.task('web', ['build'], function () {
    const webserver = require('gulp-webserver');
    gulp.src('./')
        .pipe(webserver({
            livereload: false,
            open: false
        }));
});

gulp.task('watch', ['build', 'web'], function () {
    const watch = require('gulp-watch');
    gulp.watch('app/**/*.ts', ['ts']);
    gulp.watch('app/**/*.css', ['css']);
    gulp.watch('app/**/*.scss', ['scss']);
    gulp.watch('app/**/*.html', ['html']);
});

gulp.task('test', ['build'], function (done) {
    const KarmaServer = require('karma').Server;
    new KarmaServer({
        configFile: __dirname + '/karma.conf.js',
        singleRun: true
    }, function () {
        done();
    }).start();
});

gulp.task('deploy', ['bump'], shell.task([
    'rm -rf Locator-darwin-x64',
    './node_modules/.bin/electron-packager . Locator --platform=darwin --arch=x64 --ignore "node_modules/remap-istanbul" --ignore "node_modules/gulp-*" --ignore "node_modules/http-server" --ignore "node_modules/karma-*" --ignore "node_modules/electron-*" --ignore "node_modules/jasmine-*" --ignore "node_modules/lite-server" --overwrite',
    'codesign --deep --force --verbose --sign ' + process.env.identity + ' Locator-darwin-x64/Locator.app',
    './node_modules/.bin/electron-release --app Locator-darwin-x64/Locator.app --token ' + process.env.token + ' --repo locator-kn/dashboard'
]));

gulp.task('bump', function () {
    const bump = require('gulp-bump');
    gulp.src('./package.json')
        .pipe(bump())
        .pipe(gulp.dest('./'));
});

gulp.task('build', ['html', 'ts', 'tslib', 'scss', 'css', 'assets', 'json']);
gulp.task('default', ['build']);