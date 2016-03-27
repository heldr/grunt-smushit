module.exports = function (target, done) {
    'use strict';

    var smushit = require('node-smushit'),
        smushit_settings = this.options({
            onComplete: function (response) {
                done(true);
            },
            service: 'http://api.resmush.it/ws.php'
        });

    if (!smushit_settings.recursive) {
        smushit_settings.recursive = true;
    }

    smushit.smushit(target, smushit_settings);
};
