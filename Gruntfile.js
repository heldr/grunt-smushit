/*
 * grunt-smushit
 * https://github.com/heldr/grunt-smushit
 *
 * Copyright (c) 2013 Helder Santana
 * Licensed under the MIT license.
 */

'use strict';

require('./test/build_cases');

module.exports = function (grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/**/*.js',
        '<%= nodeunit.tests %>',
      ],
      options: {
        jshintrc: '.jshintrc',
      },
    },

    // Configuration to be run (and then tested).
    smushit: {
      replace_single_dir: {
        src: 'test/tmp/replace_single_dir'
      },
      replace_single_file: {
        src: 'test/tmp/replace_single_file/dp.png'
      },
      replace_single_filter: {
        src: ['test/tmp/replace_single_filter/**/*.png']
      },
      replace_multiple_filters: {
        src: ['test/tmp/replace_multiple_filters/**/*.png', 'test/tmp/replace_multiple_filters/**/*.jpg']
      },
      replace_multiple_files: {
        src: ['test/tmp/replace_multiple_files/dp.png', 'test/tmp/replace_multiple_files/dp.jpg']
      }
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js'],
    },

  });

  grunt.loadTasks('tasks');

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  grunt.registerTask('test', ['jshint', 'smushit', 'nodeunit']);

  grunt.registerTask('default', ['jshint', 'test']);

};
