/*
 * grunt-smushit
 * 0.1.0 - 2012-06-13
 * github.com/heldr/grunt-smushit
 *
 * (c) Helder Santana
 * heldr.com
 * MIT License
 */

 /* based on grunt-recess - Thanks Sindre Sorhus*/
module.exports = function( grunt ) {
    'use strict';

    grunt.registerMultiTask('smushit', 'image compressor compression', function() {
        var smushit = require('node-smushit'),
            files = this.file.src || this.file.dist || this.file;

        smushit.smushit(files);
    });

};