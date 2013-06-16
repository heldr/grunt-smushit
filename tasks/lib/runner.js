'use strict';

module.exports = function (options, done) {

	var smushit = require('node-smushit'),
  smushit_settings = {
    recursive: true,
    onComplete: function (response) {
      done(true);
    }
  };

  if (options.service) {
    smushit_settings.service = options.service;
  }

  smushit.smushit(options.files, smushit_settings);

};
