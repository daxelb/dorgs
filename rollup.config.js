// rollup.config.js
export default {
  entry: 'index.js',
  dest: 'bundle.js',
  format: 'cjs',
  external: ['chance'], // <-- suppresses the warning
};
