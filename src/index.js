import { createInstrumenter } from 'istanbul-lib-instrument';
import loaderUtils from 'loader-utils';
import validateOptions from 'schema-utils';
import convert from 'convert-source-map';
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

  instrumenter.instrument(source, this.resourcePath, (error, instrumentedSource) => {
    let src = instrumentedSource;
    if (options.fixWebpackSourcePaths) {
      src = src.replace(/sources:\[([^\]])*\]/g, (match) => {
        const lines = match.slice('sources:['.length, -1).split(',');
        return `sources:[${
          lines
            .map(l => l.slice(1, -1).split('!'))
            .map(arr => `"${arr[arr.length - 1]}"`)
            .join(',')
        }]`;
      });
    }
    this.callback(error, src, instrumenter.lastSourceMap());
  }, srcMap);
}
