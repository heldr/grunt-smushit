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

    grunt.registerMultiTask( 'smushit', 'remove unnecessary bytes from image files', function() {
        var smushit = require( 'node-smushit' ),
            path = require( 'path' ),
            logError = grunt.fail.fatal,
            task = this,
            files = task.file.src || (function(){logError('your smushit task now requires the src: attribute like almost grunt tasks, look the examples at https://github.com/heldr/grunt-smushit');})(),
            copyFile = grunt.file.copy;

        task.asyncHandler = function() {

            var done = task.async();

            if( task.isCompleted === 1 ) {
                done( true );
            } else {
                setTimeout( task.asyncHandler, 1000 );
            }

        };

        task.callSmushit = function( files ) {

            task.isCompleted = 0;

            smushit.smushit( files, {
                recursive: true,
                onComplete: function( reports ) {
                    task.isCompleted = 1;
                }
            });

            task.asyncHandler();

        };


        var destination = function() {

            var dest = task.file.dest;

            if ( /\.(png|gif|jp(e)?g)$/i.test(dest) ) {
                logError('SmushIt destination must be a folder');
            } else if ( !/\/$/.test(dest) ) {
                dest += '/';
            }

            if( grunt.utils.kindOf( files ) === 'array' ) {

                var i = 0,
                    fileTarget = '';

                files.forEach( function( fileName ) {
                    fileTarget = dest + path.basename(fileName);

                    grunt.log.writeln( '[Copying file] ' + fileName + ' to ' + fileTarget);
                    copyFile( fileName, fileTarget );

                    if( i === files.length - 1 ) {
                        task.callSmushit( dest );
                    }

                    i++;
                });

            } else {

                copyFile( files, dest );
                task.callSmushit( dest );

            }

        };

        if( files.length ) {

            if( typeof task.file.dest !== 'undefined' ) {
                destination();
            } else {
                task.callSmushit( files );
            }

        } else {
            logError('Image not found, please check if you put the right path.');
        }
    });

};