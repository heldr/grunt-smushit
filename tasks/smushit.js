/*
 * grunt-smushit
 * https://github.com/heldr/grunt-smushit
 *
 * Copyright (c) 2012 Helder Santana
 * heldr.com
 * MIT License
 */

 /* based on grunt-recess - Thanks Sindre Sorhus*/
module.exports = function( grunt ) {
    'use strict';

    grunt.registerMultiTask('smushit', 'remove unnecessary bytes from image files', function() {
        var smushit = require('node-smushit'),
            files = this.file.src || this.file.dist || this.file;

        if(typeof files !== 'string') {
            files = grunt.file.expandFiles( files );
        }

        if(files.length) {
            var completed = 0,
                done = this.async(),
                asyncTask = function() {
                    if(completed == 1){
                        done(true);
                    } else {
                        setTimeout(asyncTask,1000);
                    }
                };

            smushit.smushit(files,{
                recursive:true,
                onComplete: function(reports){
                    completed = 1;
                }
            });

            asyncTask();

        } else {
            grunt.fail.fatal('Image not found, please check if you put the right path.');
        }
    });

};