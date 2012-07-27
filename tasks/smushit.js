/*
 * grunt-smushit
 * https://github.com/heldr/grunt-smushit
 *
 * Copyright (c) 2012 Helder Santana
 * http://heldr.com
 * MIT License
 */
module.exports = function( grunt ) {
    'use strict';

    grunt.registerMultiTask( 'smushit', 'remove unnecessary bytes from image files', function() {
        var smushit = require( 'node-smushit' ),
            path = require( 'path' ),
            logError = grunt.fail.fatal,
            task = this,
            source = task.file.src || logError('your smushit task now requires the src: attribute like almost grunt tasks, look the examples at https://github.com/heldr/grunt-smushit'),
            copyFile = grunt.file.copy,
            files = [];

        if( grunt.utils.kindOf( source ) === 'string' && !/\.(png|gif|jp(e)?g)$/i.test(source) ) {
            grunt.file.recurse(source,function(abspath){
                if(abspath){
                    files.push(abspath);
                }
            });
        } else {
            files = grunt.file.expandFiles(source);
        }

        task.callSmushit = function( done, files, output ) {

            var smushit_settings = {
                recursive: true,
                onItemComplete: function( response ) {
                    if ( output ) {
                        grunt.log.writeln( '[grunt-smushit] New optimized file: ' + output );
                    }
                    if ( done && task.hasOutput ) {
                        done( true );
                    }
                },
                onComplete: function( response ) {
                    task.isCompleted = 1;

                    if (done && !task.hasOutput ) {
                        done( true );
                    }
                }
            };

            task.isCompleted = 0;

            if (output) {
                smushit_settings.output = output;
            }

            smushit.smushit( files, smushit_settings );

        };


        var destination = function( files, output ) {

            var outputFile = ''
                done;

            if ( !/\/$/.test(output) ) {
                output += '/';
            }

            if ( grunt.file.expandDirs( output ).length === 0 ) {
                grunt.file.mkdir( output );
            }

            files.forEach( function( fileName ) {
                outputFile = output + path.basename(fileName);

                if(fileName !== outputFile) {
                    done = task.async();
                    task.callSmushit( done, fileName, outputFile );
                }

            });

        };

        if( files.length ) {

            if( typeof task.file.dest !== 'undefined' ) {
                task.hasOutput = true;
                destination( files, task.file.dest );
            } else {
                var done = task.async();
                task.callSmushit( done, files );
            }

        } else {
            logError('Image not found, please check if you put the right path.');
        }
    });

};
