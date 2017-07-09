import { createInstrumenter } from 'istanbul-lib-instrument';
import loaderUtils from 'loader-utils';

export default function (source) {
  const options = Object.assign({ produceSourceMap: true }, loaderUtils.getOptions(this));
  const instrumenter = createInstrumenter(options);

  instrumenter.instrument(source, this.resourcePath, (error, instrumentedSource) => {
    this.callback(error, instrumentedSource, instrumenter.lastSourceMap());
  });
}
