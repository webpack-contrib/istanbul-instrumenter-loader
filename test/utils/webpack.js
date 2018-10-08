import path from 'path';

import webpack from 'webpack';
import MemoryFileSystem from 'memory-fs';

const loader = require.resolve('./loader');

export default function({ fixture = 'basic.js', options, extend = {} } = {}) {
  const config = {
    entry: path.join(__dirname, '..', 'fixtures', fixture),
    output: {
      path: path.join(__dirname, '..', 'fixtures', 'dist'),
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          loader: 'babel-loader',
        },
        {
          test: /\.js$/,
          loader,
          enforce: 'post',
          options,
        },
      ],
    },
    ...extend,
    plugins: [
      new webpack.optimize.CommonsChunkPlugin({
        name: 'manifest',
      }),
    ],
  };

  return new Promise((resolve, reject) => {
    const compiler = webpack(config);
    compiler.outputFileSystem = new MemoryFileSystem();
    compiler.run((err, stats) => {
      if (err) {
        return reject(err);
      }
      return resolve(stats);
    });
  });
}
