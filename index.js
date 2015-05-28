'use strict';

var istanbul = require('istanbul');
var cache = {};

module.exports = function(source) {
    var instrumenter = new istanbul.Instrumenter({
        embedSource: true,
        noAutoWrap: true
    });

    if (this.cacheable) {
        this.cacheable();
    }

    if (!cache[this.resourcePath]) {
        cache[this.resourcePath] = instrumenter.instrumentSync(source, this.resourcePath);
    }

    return cache[this.resourcePath];
};
