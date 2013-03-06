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

    function _hasImageExtension( str ) {

        var pattern = /\.(png|gif|jp(e)?g)$/i;
        return pattern.test( str );

    }

    grunt.registerMultiTask( 'smushit', 'remove unnecessary bytes from image files', function() {
        var smushit  = require( 'node-smushit' ),
            wrench   = require('wrench'),
            path     = require( 'path' ),
            fs       = require('fs'),
            logError = grunt.fail.fatal,
            task     = this,
            copyFile = grunt.file.copy,
            files    = [],
            dest, source;

        this.files.forEach(function(f) {

            source = f.src;
            dest = f.dest;
        });

        if( dest && typeof source === 'string' && !_hasImageExtension( source ) ) {
            files = wrench.readdirSyncRecursive(source).filter(function (filename) {
                return fs.statSync(source + '/' +  filename).isFile();
            });

        } else {
            files = grunt.file.expand(source);
        }

        task.callSmushit = function( done, files, output ) {

            var smushit_settings = {
                recursive: true,
                onItemComplete: function( response ) {
                    task.filesSmashed++;
                    if ( output ) {
                        grunt.log.writeln( '[grunt-smushit] New optimized file: ' + output.blue );
                    }
                },
                onComplete: function( response ) {
                    if ( task.filesToSmash === task.filesSmashed ) {
                        done( true );
                    }
                }
            };

            if (output) {
                smushit_settings.output = output;
            }

            smushit.smushit( files , smushit_settings );

        };


        var destination = function( done, files, output ) {


            if ( !/\/$/.test(output) ) {
                output += '/';
            }


            source.forEach(function(fileName) {

                if (!grunt.file.exists(fileName)) {
                    grunt.log.warn('Source file "' + fileName + '" not found.');
                    return false;
                } else {


                    if ( !_hasImageExtension( fileName ) ) {

                        var outputFiles = [], fullPath;

                        if ( !/\/$/.test(output) ) {
                            output += '/';
                        }

                        grunt.log.writeln( '[grunt-smushit] Copying images from ' + fileName + ' to ' + output );


                        if( !grunt.file.exists(output) ) {
                            grunt.file.mkdir( output );
                        }

                        wrench.copyDirSyncRecursive( fileName , output );

                        wrench.readdirSyncRecursive(output).filter(function (fileToSmush) {
                            fullPath = output + fileToSmush;
                            if(fs.statSync( fullPath ).isFile()) {
                                outputFiles.push(fullPath);
                            }
                        });

                        task.callSmushit( done , outputFiles );

                    } else {

                        var outputFile = output + path.basename(fileName),
                            sourceFile = fileName;

                        wrench.mkdirSyncRecursive( path.dirname(outputFile) );

                        if(fileName !== outputFile) {
                            task.callSmushit( done, sourceFile, outputFile );
                        }

                    }

                }
            });

        };

        if( files.length ) {

            var done = task.async(),
                action;
            task.filesToSmash = files.length;
            task.filesSmashed = 0;

            action = (dest) ? destination : task.callSmushit;
            action( done , files , dest );

        }

    });

};
