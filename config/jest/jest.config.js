const path = require('path');

module.exports = {
  notify: true,
  verbose: true,
  rootDir: '../../',
  testMatch: [
    '<rootDir>/test/**/*.spec.js'
  ],
  collectCoverageFrom: [
    '<rootDir>/src/**/*.js'
  ],
  coverageDirectory: './coverage',
  coveragePathIgnorePatterns: [
    '<rootDir>/node_modules/'
  ],
  coverageReporters: ['json', 'html', 'text', 'lcov'],
  coverageThreshold: {
    global: {
      branches: 90,
      functions: 90,
      lines: 90,
      statements: 90
    }
  },
  globals: {
    __root: path.resolve(__dirname, '../../'),
    __tmp: path.resolve(__dirname, '../../test/__tmp__')
  }
};
