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
const fs = require('fs');
const env = JSON.parse(fs.readFileSync('.env', 'utf-8'));

gulp.task('clean', function () {
    return gulp.src(['production/*',
            'dist/*',
            'distributed/*',
            '!production/index.html',
            '!production/package.json',
            '!distributed/.npmignore',
            '!distributed/package.json'],
        {read: false})
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

gulp.task('electron.deploy', ['production', 'bump'], shell.task([
    'rm -rf mia-darwin-x64',
    './node_modules/.bin/electron-packager production mia --platform=darwin --arch=x64 --ignore "node_modules/remap-istanbul" --ignore "node_modules/gulp-*" --ignore "node_modules/http-server" --ignore "node_modules/karma-*" --ignore "node_modules/electron-*" --ignore "node_modules/jasmine-*" --ignore "node_modules/lite-server" --ignore "node_modules/typescript" --ignore "node_modules/tslint"  --ignore "node_modules/systemjs-builder" --overwrite',
    'codesign --deep --force --verbose --sign ' + env.identity + ' mia-darwin-x64/mia.app',
    './node_modules/.bin/electron-release --app mia-darwin-x64/mia.app --token ' + env.token + ' --repo michaelknoch/mia'
], {
    ignoreErrors: true
}));

gulp.task('bump', function () {
    const bump = require('gulp-bump');
    gulp.src('package.json')
        .pipe(bump())
        .pipe(gulp.dest('.'));
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


gulp.task('production', ['build'], function () {
    const browserifyBuild = require('gulp-browserify-js-inline');

    let modules = [
        'node_modules/core-js/client/shim.min.js',
        'node_modules/zone.js/dist/zone.js',
        'node_modules/reflect-metadata/Reflect.js',
        'node_modules/chart.js/dist/Chart.js',
        'node_modules/bootstrap/dist/css/bootstrap.min.css',
        'node_modules/font-awesome/**/*'
    ]

    gulp.src('electron.js')
        .pipe(gulp.dest('production'));

    gulp.src('dist/assets/**/*')
        .pipe(gulp.dest('production/dist/assets/'));

    gulp.src(['dist/font/*', '!dist/font/fontface.scss'])
        .pipe(gulp.dest('production/font'));

    gulp.src('dist/style.css')
        .pipe(gulp.dest('production'));

    gulp.src(modules)
        .pipe(gulp.dest('production/dependencies'));

    return browserifyBuild({
        outputPath: 'production',
        outputFile: 'app.bundle.js',
        minify: false,
        browserifyOptions: {
            debug: false,
            cache: {},
            packageCache: {}
        },
        src: 'dist/main.js'
    });
});

gulp.task('dist.deploy', ['dist.inline', 'dist.copy']);
gulp.task('build', ['html', 'ts', 'scss', 'css', 'assets', 'json', 'font']);
gulp.task('default', ['build']);