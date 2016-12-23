'use strict';

var istanbulLibInstrument = require('istanbul-lib-instrument');
var loaderUtils = require('loader-utils');
var assign = require('object-assign');

var sourceMapRegEx = /(?:\/{2}[#@]{1,2}|\/\*)\s+sourceMappingURL\s*=\s*(data:(?:[^;]+;)+base64,)?(\S+)/;

module.exports = function(source, sourceMap) {
    // use inline source map, if any    
    var match = sourceMapRegEx.exec(source);
    if (!sourceMap && match[1] && match[2]) {
        sourceMap = JSON.parse(new Buffer(match[2], 'base64').toString('utf8'));
    }

    var userOptions = loaderUtils.parseQuery(this.query);
    var instrumenter = istanbulLibInstrument.createInstrumenter(
        assign({ produceSourceMap: this.sourceMap }, userOptions)
    );

    if (this.cacheable) {
        this.cacheable();
    }

    var that = this;
    return instrumenter.instrument(source, this.resourcePath, function (error, source) {
        that.callback(error, source, instrumenter.lastSourceMap());
    }, sourceMap);
};
