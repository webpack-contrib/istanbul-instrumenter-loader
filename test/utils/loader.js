import path from 'path';
import loader from '../../src/cjs';

module.exports = function (...args) {
  // hack the resourcePath to be consistent across systems so that tests always work
  this.resourcePath = this.resourcePath
    .replace(path.resolve(__dirname, '..'), '')
    // make windows paths appear like unix
    .replace(/\\/g, '/');
  return loader.call(this, ...args);
};
