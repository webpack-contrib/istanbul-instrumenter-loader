import path from 'path';
import loader from '../../src/cjs';

const normalize = str => str.split(path.sep).join('/');

module.exports = function wrapper(source, map, ...args) {
  // hack the resourcePath to be consistent across systems so that tests always work
  this.resourcePath = normalize(this.resourcePath.replace(path.resolve(__dirname, '..'), ''));

  // do the same hack for sourcemaps so tests are consistent
  const sourceMap = map;
  if (sourceMap) {
    sourceMap.sourceRoot = '';
    sourceMap.sources = sourceMap.sources.map(normalize);
  }

  return loader.call(this, source, sourceMap, ...args);
};
