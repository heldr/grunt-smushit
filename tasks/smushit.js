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
            wrench = require('wrench'),
            colors = require('colors'),
            path = require( 'path' ),
            fs = require('fs'),
            logError = grunt.fail.fatal,
            task = this,
            source = task.file.src || logError('your smushit task now requires the src: attribute like almost grunt tasks, look the examples at https://github.com/heldr/grunt-smushit'),
            copyFile = grunt.file.copy,
            files = [],
            dest = task.file.dest || null;

        if( grunt.utils.kindOf( source ) === 'string' && !/\.(png|gif|jp(e)?g)$/i.test(source) ) {
            files = wrench.readdirSyncRecursive(source).filter(function (filename) {
                return fs.statSync(source + '/' +  filename).isFile();
            });

        } else if ( grunt.utils.kindOf( source ) === 'array') {
            files = source;
        } else {
            grunt.log.writeln('invalid src format'.red);
            process.exit();
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

            smushit.smushit( files, smushit_settings );

        };


        var destination = function( done, files, output ) {

            var outputFile = '' , sourceFile = '';

            if ( !/\/$/.test(output) ) {
                output += '/';
            }

            if ( !/\/$/.test(source) ) {
                source += '/';
            }

            console.log(files);

            files.forEach( function( fileName ) {


                console.log(fileName);
                console.log(output);
                console.log(source);

                outputFile = output + fileName;
                sourceFile = source + fileName;

                process.exit();

                wrench.mkdirSyncRecursive( path.dirname(outputFile) );

                if(fileName !== outputFile) {
                    task.callSmushit( done, sourceFile, outputFile );
                }

            });

        };

        if( files.length ) {

            var done = task.async();
            task.filesToSmash = files.length;
            task.filesSmashed = 0;

            if( typeof dest !== 'undefined' ) {
                destination( done, files, dest );
            } else {
                task.callSmushit( done, files, false );
            }

        } else {
            logError('Image not found, please check if you put the right path.');
        }
    });

};
