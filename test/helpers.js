export function stripLocalPaths(source) { // eslint-disable-line import/prefer-default-export
  const regexpReplace = new RegExp(__dirname, 'g');
  return source.replace(regexpReplace, '');
}
