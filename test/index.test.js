import path from 'path';
import webpack from './utils/webpack';

test('instrument code', async () => {
  const { stats, filesystem } = await webpack();

  const instrumentedSource = filesystem.readFileSync(path.resolve(stats.compilation.options.output.path, 'main.js'), 'utf8');
  expect(instrumentedSource).toMatchSnapshot();
});

test('sourcemap files on by default', async () => {
  const { stats, filesystem } = await webpack({
    extend: {
      devtool: 'source-map',
    },
  });

  const sourceMap = filesystem.readFileSync(path.resolve(stats.compilation.options.output.path, 'main.js.map'), 'utf8');
  expect(sourceMap).toMatchSnapshot();
  expect(stats.compilation.errors).toMatchSnapshot('errors');
  expect(stats.compilation.warnings).toMatchSnapshot('warnings');
});

test('disabled sourcemaps', async () => {
  const { stats, filesystem } = await webpack({
    extend: {
      devtool: 'source-map',
    },
    options: {
      produceSourceMap: false,
    },
  });

  const sourceMap = filesystem.readFileSync(path.resolve(stats.compilation.options.output.path, 'main.js.map'), 'utf8');
  expect(sourceMap).toMatchSnapshot();
  expect(stats.compilation.errors).toMatchSnapshot('errors');
  expect(stats.compilation.warnings).toMatchSnapshot('warnings');
});
