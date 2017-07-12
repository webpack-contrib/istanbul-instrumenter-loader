import { createInstrumenter } from 'istanbul-lib-instrument';
import loaderUtils from 'loader-utils';
import convert from 'convert-source-map';

export default function (source, sourceMap) {
  let srcMap = sourceMap;
  // use inline source map, if any
  if (!srcMap) {
    const inlineSourceMap = convert.fromSource(source);
    if (inlineSourceMap) {
      srcMap = inlineSourceMap.sourcemap;
    }
  }

  const options = Object.assign({ produceSourceMap: true }, loaderUtils.getOptions(this));
  const instrumenter = createInstrumenter(options);

  instrumenter.instrument(source, this.resourcePath, (error, instrumentedSource) => {
    this.callback(error, instrumentedSource, instrumenter.lastSourceMap());
  }, srcMap);
}
