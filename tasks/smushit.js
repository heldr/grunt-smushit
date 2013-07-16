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

  function getSubPath(fileDir, filepath) {
    fileDir = path.normalize(fileDir.replace(/\/(\*\*\/|\*)[\w\W]*[\/]?$/, "") + '/');      // regex: remove **/... or *... if it's a dir needed to be expanded
    return filepath.substring(fileDir.length);
  }

  grunt.registerMultiTask('smushit', 'A Grunt task to remove unnecessary bytes of PNG and JPG using Yahoo Smushit.', function () {

    if (!this.files[0]) {
      grunt.fail.fatal('No src or invalid src provided.');
      return;
    }
        
    var task = this,
        done = task.async(),
        src = this.files[0].orig.src,
        dest = this.files[0].orig.dest,
        cwd = this.files[0].orig.cwd,
        target, finalpath;
        
    if (dest) { // if we have dest param, copy everything from source to dest
      target = (cwd) ? cwd + '/' + dest : dest;
            
      if (!grunt.file.exists(target)) {
        grunt.file.mkdir(target);
      }
            
      src.forEach(function (source) {

        source = (cwd) ? cwd + '/' + source : source;       // if cwd is provided, add cwd into the source path so we can expand
        grunt.log.writeln(source);

        if (grunt.file.isDir(source)) {

          grunt.file.recurse(source, function (abspath, rootdir, subdir, filename) {
            finalpath = (subdir) ? target + '/' + subdir + '/' + filename : target + '/' + filename;
            grunt.file.copy(abspath, finalpath);
          });

        } else {

          if (!cwd || grunt.file.doesPathContain(cwd, source)) {  // if there is no cwd, we won't test if it's in cwd path (for obvious reason)

            if (!grunt.file.exists(source.replace(/\/(\*\*\/|\*)[\w\W]*[\/]?$/, ""))) {
              grunt.log.error().error('Path "' + source + '" not found.');
            }

            grunt.file.expand(source).forEach(function (filepath) {
              var fileDir = (grunt.file.isDir(source)) ? source : path.dirname(source);
              finalpath = target + '/' + getSubPath(fileDir, filepath);
              grunt.file.copy(filepath, finalpath);
            });

          } else {

            grunt.log.error().error('Path "' + path.join(cwd, source) + '" is not in cwd (' + cwd + ')');
            grunt.log.error('Smushit will not process this path');

          }
        }
      });

    } else {

      this.files.forEach(function (f) {
        src = f.src.filter(function (filepath) {
          if (!grunt.file.exists(filepath)) {
            grunt.log.warn('Path "' + filepath + '" not found.');
            return false;
          } else {
            return true;
          }
        });
      });
            
      target = src;
    }

    var options = task.options({
      files: target
    });
        
    runner(options, done);
  });

};
