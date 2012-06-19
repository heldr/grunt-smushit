/*
 * grunt-smushit
 * https://github.com/heldr/grunt-smushit
 *
 * Copyright (c) 2012 Helder Santana
 * heldr.com
 * MIT License
 */
module.exports = function( grunt ) {
    'use strict';

    grunt.registerMultiTask('smushit', 'remove unnecessary bytes from image files', function() {
        var smushit = require('node-smushit'),
            task = this,
            log = grunt.log.writeln,
            files = this.file.src || this.file,
            logError = grunt.fail.fatal,
            copyFile = grunt.file.copy;

        task.asyncHandler = function() {
            var done = task.async();

            if(task.isCompleted === 1){
                done(true);
            } else {
                setTimeout(task.asyncHandler,1000);
            }
        };

        task.callSmushit = function(files){

            task.isCompleted = 0;

            smushit.smushit(files,{
                recursive:true,
                onComplete: function(reports){
                    task.isCompleted = 1;
                }
            });

            task.asyncHandler();
        };


        var destination = function(){
            var i = 0,
                dest = this.files.target;

            if(files.length === dest.length) {
                files.foreach(function(fileName){
                    log('[Copying file] ' + fileName);
                    copyFile(fileName,dest[i]);
                    log('[New file created] ' + dest[i]);

                    if(i === files.length - 1){
                        task.callSmushit(dest);
                    }

                    i++;
                });
            } else {
                logError('Check the number of sources files and destinations');
            }
        };

        if(grunt.utils.kindOf(files) === 'array') {
            files = grunt.file.expandFiles( files );
        }

        if(files.length) {

            if(this.file.dest) {
                destination(files, this.file.dest);
            } else {
                task.callSmushit(files);
            }

        } else {
            logError('Image not found, please check if you put the right path.');
        }
    });

};