'use strict';

module.exports = function(options, done) {

	var smushit  = require('node-smushit'),
      smushit_settings = {
        recursive: true,
        onComplete: function( response ) {
          done( true );
        }
      };

  if (options.output) {
    smushit_settings.output = options.output;
  }

  smushit.smushit(options.files, smushit_settings);

};
