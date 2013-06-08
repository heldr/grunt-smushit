/*
 * grunt-smushit
 * https://github.com/heldr/grunt-smushit
 *
 * Copyright (c) 2013 Helder Santana
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {

  var runner = require('./lib/runner');

  grunt.registerMultiTask('smushit', 'A Grunt task to remove unnecessary bytes of PNG and JPG using Yahoo Smushit.', function () {

    var task = this,
        done = task.async(),
        src,
        srcLen,
        target;

    this.files.forEach(function (f) {

      if (f.orig.src.length) {

        src = f.src.filter(function (filepath) {
          if (!grunt.file.exists(filepath)) {
            grunt.log.warn('Path "' + filepath + '" not found.');
            return false;
          } else {
            return true;
          }
        });

        runner({
          files: src
        }, done);

      } else {
        grunt.log.error('Source not found');
      }

    });
  });

};
