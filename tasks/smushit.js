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
            smushit.smushit(files);
        } else {
            grunt.fail.fatal('Image not found, please check if you put the right path.');
        }
    });

};