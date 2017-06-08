import istanbulLibInstrument from 'istanbul-lib-instrument';
import loaderUtils from 'loader-utils';
import convert from 'convert-source-map';

export default function (source, sourceMap) {
  let srcMap = sourceMap;
  // use inline source map, if any
  const inlineSourceMap = convert.fromSource(source);
  if (!srcMap && inlineSourceMap) {
    srcMap = inlineSourceMap.sourcemap;
  }

  const userOptions = loaderUtils.parseQuery(this.query);
  const instrumenter = istanbulLibInstrument.createInstrumenter(
    Object.assign({ produceSourceMap: this.srcMap }, userOptions),
  );

  return instrumenter.instrument(source, this.resourcePath, (error, source) => {
    this.callback(error, source, instrumenter.lastSourceMap());
  }, srcMap);
}
