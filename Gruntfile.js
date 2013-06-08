module.exports = function (grunt) {
    'use strict';

    grunt.initConfig({
        smushit: {
            output: {
                src: ['tests/img/logo.png', 'tests/img/brand/logo.png'],
                dest: 'tests/opt_img'
            },
            outputPath: {
                src: 'tests/img',
                dest: 'tests/opt_img'
            },
            specific: {
                src: ['tests/img/logo.png']
            },
            single: {
                src: 'tests/img/logo.png'
            },
            path: {
                src: 'tests/img'
            }
        },
        jshint: {
            files: [
                'Gruntfile.js',
                'tasks/**/*.js'
            ],
            options: {
                jshintrc: '.jshintrc'
            }
        }
    });

    grunt.loadTasks('tasks');
    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-jshint');

    grunt.registerTask('default', ['jshint', 'smushit']);

};