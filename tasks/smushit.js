/*
 * grunt-smushit
 * https://github.com/heldr/grunt-smushit
 *
 * Copyright (c) 2013 Helder Santana
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {

  var path = require('path'),
      runner = require('./lib/runner');

  grunt.registerMultiTask('smushit', 'A Grunt task to remove unnecessary bytes of PNG and JPG using Yahoo Smushit.', function () {

    var task = this,
        done = task.async(),
        src, target, finalpath;

    this.files.forEach(function (f) {

      src = f.src.filter(function (filepath) {
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Path "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      });

      if (f.orig.dest) {

        target = f.orig.dest;

        if (!grunt.file.exists(target)) {
          grunt.file.mkdir(target);
        }

        if (f.orig.src.length === 1 && grunt.file.isDir(f.orig.src[0])) {
          grunt.file.recurse(f.orig.src[0], function (abspath, rootdir, subdir, filename) {
            finalpath = (subdir) ? target + '/' + subdir + '/' + filename : target + '/' + filename;
            grunt.file.copy(abspath, finalpath);
          });
        } else {
          src.forEach(function (filepath) {
            finalpath = target + '/' + path.basename(filepath);
            grunt.file.copy(filepath, finalpath);
          });
        }

      } else {
        target = src;
      }

      runner({
        files: target
      }, done);

    });
  });

};
