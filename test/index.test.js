import path from 'path';
import fs from 'fs';
import webpack from './utils/webpack';

const fixture = 'basic.js';

test('instrument code', async () => {
  const stats = await webpack({ fixture });
  const instrumentedSource = stats.compilation.assets['main.js'].source();
  expect(instrumentedSource).toMatchSnapshot();
});

test('sourcemap files on by default', async () => {
  const stats = await webpack({
    extend: {
      devtool: 'source-map',
    },
    fixture,
  });
  const sourceMap = stats.compilation.assets['main.js.map'].source();
  const originalSource = fs.readFileSync(path.join(__dirname, 'fixtures', fixture), 'utf8');
  const [sourceMapSource] = JSON.parse(sourceMap).sourcesContent;
  expect(sourceMapSource).toEqual(originalSource);
  expect(sourceMap).toMatchSnapshot();
  expect(stats.compilation.errors).toMatchSnapshot('errors');
  expect(stats.compilation.warnings).toMatchSnapshot('warnings');
});

test('disabled sourcemaps', async () => {
  const stats = await webpack({
    extend: {
      devtool: 'source-map',
    },
    options: {
      produceSourceMap: false,
    },
    fixture,
  });
  const sourceMap = stats.compilation.assets['main.js.map'].source();
  const instrumentedSource = stats.compilation.assets['main.js'].source();
  const [originalSource] = JSON.parse(sourceMap).sourcesContent;
  // Webpack adds newline after "use strict" that we need to remove to compare.
  const trimmedSourceWithoutFooter = originalSource.slice(16, originalSource.length);
  expect(instrumentedSource).toContain(trimmedSourceWithoutFooter);
  expect(sourceMap).toMatchSnapshot();
  expect(stats.compilation.errors).toMatchSnapshot('errors');
  expect(stats.compilation.warnings).toMatchSnapshot('warnings');
});
