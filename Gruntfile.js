module.exports = function( grunt ) {
    'use strict';

    grunt.initConfig({
        smushit:{
            output: {
                src:['tests/img/logo.png','tests/img/brand/logo.png'],
                dest:'tests/opt_img'
            },
            outputPath:{
                src:'tests/img',
                dest:'tests/opt_img'
            },
            specific: {
                src:['tests/img/logo.png']
            },
            single: {
                src:'tests/img/logo.png'
            },
            path: {
                src:'tests/img'
            }
        },
        jshint: {
            files: [
                'grunt.js',
                'tasks/**/*.js'
            ],
            options: {
                es5: true,
                esnext: true,
                bitwise: true,
                curly: true,
                eqeqeq: true,
                latedef: true,
                newcap: true,
                noarg: true,
                noempty: true,
                regexp: true,
                undef: true,
                strict: true,
                trailing: true,
                smarttabs: true,
                node: true
            }
        }
    });

    grunt.loadTasks('tasks');
    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-jshint');

    grunt.registerTask( 'default', ['jshint','smushit'] );

};