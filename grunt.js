module.exports = function( grunt ) {
    'use strict';

    grunt.initConfig({
        smushit:{
            specific:['tests/img/logo.png','tests/img/tellme.jpg'],
            path:'tests/img',
            only:'tests/img/logo.png'
        },
        lint: {
            files: [
                'grunt.js',
                'tasks/**/*.js'
            ]
        },
        watch: {
            files: '<config:lint.files>',
            tasks: 'default'
        },
        jshint: {
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

    grunt.registerTask( 'default', 'smushit:specific smushit:path smushit:only lint' );

};