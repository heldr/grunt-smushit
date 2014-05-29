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
    var cases = grunt.file.readJSON('test/cases.json');

    grunt.initConfig({
        jshint: {
            all: [
                'Gruntfile.js',
                'tasks/**/*.js',
                'test/build_cases.js',
                '<%= nodeunit.tests %>'
            ],
            options: {
                jshintrc: '.jshintrc',
            }
        },

        // Configuration to be run (and then tested).
        smushit: cases,

    // Unit tests.
        nodeunit: {
            tests: ['test/*_test.js'],
        },

        // create version tag and push it
        release: {
            options: {
                npm: false,
                tagName: 'v<%= version %>',
                commitMessage: 'bump version <%= version %>',
                tagMessage: 'create tag v<%= version %>'
            }
        }
    });

    grunt.task.registerTask('smushit-noverbose', 'run smushit without log', function () {
        grunt.config.merge({
            smushit: {
                options: {
                    verbose: false
                }
            }
        });
        grunt.task.run(['smushit']);
    });

    grunt.loadTasks('tasks');

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-nodeunit');
    grunt.loadNpmTasks('grunt-release');

    grunt.registerTask('test', ['jshint', 'smushit', 'nodeunit']);

    grunt.registerTask('default', ['test']);
};
