import loader from '../src';

describe('Errors', () => {
  test('Options Validation Error', () => {
    const err = () => loader.call({ query: { debug: 'foo' } });

    expect(err).toThrow();
    expect(err).toThrowErrorMatchingSnapshot();
  });
});
