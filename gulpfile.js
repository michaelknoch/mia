'use strict';

const gulp = require('gulp');
const typescript = require('gulp-typescript');
const tscConfig = require('./tsconfig.json');
const shell = require('gulp-shell');
const tslint = require("gulp-tslint");
const sourcemaps = require('gulp-sourcemaps');
const inlineNg2Template = require('gulp-inline-ng2-template');
const clean = require('gulp-clean');
const merge = require('merge2');  // Require separate installation
const Builder = require('systemjs-builder');

/** then bundle */
gulp.task('bundle', function () {
    // optional constructor options
    // sets the baseURL and loads the configuration file
    var builder = new Builder('', 'systemjs.config.js');

    /*
     the parameters of the below buildStatic() method are:
     - your transcompiled application boot file (the one wich would contain the bootstrap(MyApp, [PROVIDERS]) function - in my case 'dist/app/boot.js'
     - the output (file into which it would output the bundled code)
     - options {}
     */
    return builder
        .buildStatic('dist/main.js', 'dist/bundle.js', {minify: true, sourceMaps: true})
        .then(function () {
            console.log('Build complete');
        })
        .catch(function (err) {
            console.log('Build error');
            console.log(err);
        });
});

gulp.task('clean', function () {
    return gulp.src(['dist/*', 'distributed/*', '!distributed/.npmignore', '!distributed/package.json'], {read: false})
        .pipe(clean());
});

gulp.task('ts', function () {

    const tsResult = gulp.src('app/**/*.ts')
        .pipe(sourcemaps.init())
        .pipe(typescript(tscConfig.compilerOptions));

    return merge([
        tsResult.js
            .pipe(sourcemaps.write(".")).pipe(gulp.dest('dist')),
        tsResult.dts.pipe(gulp.dest('dist'))
    ]);

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

gulp.task('font', function () {
    return gulp.src('app/font/**/*').pipe(gulp.dest('dist/font'));
});

gulp.task('clean.comp', ['ts'], function () {
    gulp.src(['mia-distributed/comp/**/*.html', 'mia-distributed/comp/**/*.css'], {read: false})
        .pipe(clean());
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
    gulp.watch('app/**/*.scss', ['scss']);
    gulp.watch('app/**/*.html', ['html']);
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


gulp.task('dist.copy', ['build'], function () {
    gulp.src(['dist/**/*.d.ts', 'dist/**/*.js.map', 'app/shared.scss', 'app/colors.scss'])
        .pipe(gulp.dest('distributed'));
});

gulp.task('dist.inline', ['build'], function () {
    const stream = gulp.src('dist/**/*.js')
        .pipe(inlineNg2Template({
            base: '/app',
            useRelativePaths: true,
            supportNonExistentFiles: false
        }))
        .pipe(gulp.dest('distributed'));

    stream.on('end', function () {
        const bump = require('gulp-bump');
        gulp.src('distributed/package.json')
            .pipe(bump())
            .pipe(gulp.dest('distributed'));
    });
});

gulp.task('dist.deploy', ['dist.inline', 'dist.copy']);
gulp.task('build', ['html', 'ts', 'scss', 'css', 'assets', 'json', 'font']);
gulp.task('default', ['build']);