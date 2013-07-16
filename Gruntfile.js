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
      },
      output_single_dir: {
        src: 'test/fixtures/single',
        dest: 'test/tmp/output_single_dir'
      },
      output_single_dir_with_sub: {
        src: 'test/fixtures',
        dest: 'test/tmp/output_single_dir_with_sub'
      },
      output_single_file: {
        src: 'test/fixtures/single/dp.png',
        dest: 'test/tmp/output_single_file'
      },
      output_single_filter: {
        src: ['test/fixtures/single/**/*.png'],
        dest: 'test/tmp/output_single_filter'
      },
      output_multiple_filters: {
        src: ['test/fixtures/single/**/*.png', 'test/fixtures/single/**/*.jpg'],
        dest: 'test/tmp/output_multiple_filters'
      },
      output_multiple_files: {
        src: ['test/fixtures/single/dp.png', 'test/fixtures/single/dp.jpg'],
        dest: 'test/tmp/output_multiple_files'
      },
			output_single_dir_with_cwd: {
				cwd: 'test',
				expand: true,
        src: 'fixtures/single',
        dest: 'tmp/output_single_dir_with_cwd'
      },
      output_single_dir_with_sub_with_cwd: {
        cwd: 'test',
				expand: true,
        src: 'fixtures/single',
        dest: 'tmp/output_single_dir_with_sub_with_cwd'
      },
      output_single_file_with_cwd: {
        cwd: 'test',
				expand: true,
        src: 'fixtures/single/dp.png',
        dest: 'tmp/output_single_file_with_cwd'
      },
      output_single_filter_with_cwd: {
        cwd: 'test',
				expand: true,
        src: ['fixtures/single/**/*.png'],
        dest: 'tmp/output_single_filter_with_cwd'
      },
      output_multiple_filters_with_cwd: {
        cwd: 'test',
				expand: true,
        src: ['fixtures/single/**/*.png', 'fixtures/single/**/*.jpg'],
        dest: 'tmp/output_multiple_filters_with_cwd'
      },
      output_multiple_files_with_cwd: {
        cwd: 'test',
				expand: true,
        src: ['fixtures/single/dp.png', 'fixtures/single/dp.jpg'],
        dest: 'tmp/output_multiple_files_with_cwd'
      },
			output_single_nested_dir: {
				src: ['test/fixtures/nested1'],
				dest: 'test/tmp/output_single_nested_dir'
			},
			output_single_nested_dir_ending_with_slash: {
				src: ['test/fixtures/nested1/'],
				dest: 'test/tmp/output_single_nested_dir_ending_with_slash'
			},
			output_single_nested_dir_with_filter: {
				src: ['test/fixtures/nested1/**/*.png'],
				dest: 'test/tmp/output_single_nested_dir_with_filter'
			},
			output_multiple_nested_dir: {
				src: ['test/fixtures/nested1', 'test/fixtures/nested2'],
				dest: 'test/tmp/output_multiple_nested_dir'
			},
			output_multiple_nested_dir_with_filter: {
				src: ['test/fixtures/nested1/**/*.png', 'test/fixtures/nested2/**/*.jpg'],
				dest: 'test/tmp/output_multiple_nested_dir_with_filter'
			},
			output_single_nested_dir_with_cwd: {
				cwd: 'test',
				expand: true,
        src: ['fixtures/nested1'],
				dest: 'tmp/output_single_nested_dir_with_cwd'
			},
			output_single_nested_dir_ending_with_slash_with_cwd: {
				cwd: 'test',
				expand: true,
        src: ['fixtures/nested1/'],
				dest: 'tmp/output_single_nested_dir_ending_with_slash_with_cwd'
			},
			output_single_nested_dir_with_filter_with_cwd: {
				cwd: 'test',
				expand: true,
        src: ['fixtures/nested1/**/*.png'],
				dest: 'tmp/output_single_nested_dir_with_filter_with_cwd'
			},
			output_multiple_nested_dir_with_cwd: {
				cwd: 'test',
				expand: true,
        src: ['fixtures/nested1', 'fixtures/nested2'],
				dest: 'tmp/output_multiple_nested_dir_with_cwd'
			},
			output_multiple_nested_dir_with_filter_with_cwd: {
				cwd: 'test',
				expand: true,
        src: ['fixtures/nested1/**/*.png', 'fixtures/nested2/**/*.jpg'],
				dest: 'tmp/output_multiple_nested_dir_with_filter_with_cwd'
			}
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js'],
    },

    // create version tag e push it
    release: {
      options: {
        npm: false,
        tagName: 'v<%= version %>',
        commitMessage: 'bump version <%= version %>',
        tagMessage: 'create tag v<%= version %>'
      }
    }
  });

  grunt.loadTasks('tasks');

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');
  grunt.loadNpmTasks('grunt-release');

  grunt.registerTask('test', ['jshint', 'smushit', 'nodeunit']);

  grunt.registerTask('default', ['jshint', 'test']);

};
