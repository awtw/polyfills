/**
 * @license
 * Copyright (c) 2014 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */

'use strict';

/* eslint-env node */
/* eslint-disable no-console */

let gulp = require('gulp');
let closureCompiler = require('google-closure-compiler').gulp();
let sourcemaps = require('gulp-sourcemaps');

function generateClosureOptions(entry_point, js_output_file) {
  return {
    dependency_mode: 'STRICT',
    new_type_inf: true,
    compilation_level: 'SIMPLE',
    language_in: 'ES6_STRICT',
    language_out: 'ES5_STRICT',
    output_wrapper: '(function(){\n%output%\n}).call(this)',
    entry_point,
    js_output_file
  };
}

gulp.task('default', function() {
  let opts = generateClosureOptions('/src/ShadyCSS', 'shadycss.min.js');
  return gulp.src(['./src/*.js'], {base: './'})
    .pipe(sourcemaps.init())
    .pipe(closureCompiler(opts))
    .on('error', (e) => console.error(e))
    .pipe(sourcemaps.write('/'))
    .pipe(gulp.dest('./'))
});

gulp.task('test-modules', function() {
  let opts = generateClosureOptions('/tests/module/css-parse-shim', 'css-parse.min.js');
  return gulp.src(['./tests/module/css-parse-shim.js', './src/*.js'], {base: './'})
    .pipe(sourcemaps.init())
    .pipe(closureCompiler(opts))
    .on('error', (e) => console.error(e))
    .pipe(sourcemaps.write('/'))
    .pipe(gulp.dest('./tests/module/generated'))
});
