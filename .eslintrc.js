module.exports = {
  root: true,
  extends: 'standard',
  plugins: [
    'standard',
    'jest'
  ],
  rules: {
    semi: [2, 'always']
  },
  env: {
    node: true,
    jest: true
  },
  globals: {
    __root: true,
    __tmp: true
  }
};
