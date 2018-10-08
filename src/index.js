import { createInstrumenter } from 'istanbul-lib-instrument';
import loaderUtils from 'loader-utils';
import validateOptions from 'schema-utils';
import convert from 'convert-source-map';
import merge from 'merge-source-map';
/* eslint-disable-line */
const schema = require('./options');

export default function (source, sourceMap) {
  const options = Object.assign({ produceSourceMap: true }, loaderUtils.getOptions(this));

  validateOptions(schema, options, 'Istanbul Instrumenter Loader');

  let srcMap = sourceMap;
  // use inline source map, if any
  if (!srcMap) {
    const inlineSourceMap = convert.fromSource(source);
    if (inlineSourceMap) {
      srcMap = inlineSourceMap.sourcemap;
    }
  }

  const instrumenter = createInstrumenter(options);

  instrumenter.instrument(
    source,
    // This name must be unique for source map merging to work with multiple merges regardless of
    // file names.
    `${this.resourcePath}.pre-istanbul.js`,
    (error, instrumentedSource) => {
      let instrumentedSourceMap = instrumenter.lastSourceMap();
      if (srcMap && instrumentedSourceMap) {
        // merge srcMap and instrumentedSourceMap together
        instrumentedSourceMap = merge(srcMap, instrumentedSourceMap);
      }
      this.callback(error, instrumentedSource, instrumentedSourceMap);
    },
    srcMap,
  );
}
