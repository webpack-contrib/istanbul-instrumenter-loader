'use strict';

var istanbul = require('istanbul');

module.exports = function(source) {
    var instrumenter = new istanbul.Instrumenter({
        embedSource: true,
        noAutoWrap: true
    });

    return instrumenter.instrumentSync(source, this.request);
};
