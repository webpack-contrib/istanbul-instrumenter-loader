import istanbulLibInstrument from 'istanbul-lib-instrument';
import loaderUtils from 'loader-utils';
import convert from 'convert-source-map';

export default function (source, sourceMap) {
  // use inline source map, if any
  const inlineSourceMap = convert.fromSource(source);
  if (!sourceMap && inlineSourceMap) {
    this.sourceMap = inlineSourceMap.sourcemap;
  }

  const userOptions = loaderUtils.getOptions(this) || {};
  const instrumenter = istanbulLibInstrument.createInstrumenter(
    Object.assign({ produceSourceMap: this.sourceMap }, userOptions),
  );

  if (this.cacheable) {
    this.cacheable();
  }

  const that = this;
  return instrumenter.instrument(source, this.resourcePath, (error, src) => {
    that.callback(error, src, instrumenter.lastSourceMap());
  }, sourceMap);
}
