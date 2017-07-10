import webpack from './utils/webpack';

test('instrument code', async () => {
  const stats = await webpack();
  const instrumentedSource = stats.compilation.assets['main.js'].source();
  expect(instrumentedSource).toMatchSnapshot();
});

test('sourcemap files on by default', async () => {
  const stats = await webpack({
    extend: {
      devtool: 'sourcemap',
    },
  });
  const sourceMap = stats.compilation.assets['main.js.map'].source();
  expect(sourceMap).toMatchSnapshot();
  expect(stats.compilation.errors).toMatchSnapshot('errors');
  expect(stats.compilation.warnings).toMatchSnapshot('warnings');
});

test('disabled sourcemaps', async () => {
  const stats = await webpack({
    extend: {
      devtool: 'sourcemap',
    },
    options: {
      produceSourceMap: false,
    },
  });
  const sourceMap = stats.compilation.assets['main.js.map'].source();
  expect(sourceMap).toMatchSnapshot();
  expect(stats.compilation.errors).toMatchSnapshot('errors');
  expect(stats.compilation.warnings).toMatchSnapshot('warnings');
});
