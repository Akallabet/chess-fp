/* eslint-disable no-undef */

module.exports = {
  moduleNameMapper: {
    '.+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__mocks__/file-mock.js',
    '.+\\.(css|less)$': '<rootDir>/__mocks__/styleMock.js',
  },
  testPathIgnorePatterns: ['node_modules'],
  transformIgnorePatterns: ['node_modules'],
  globals: {
    __PATH_PREFIX__: '',
  },
  collectCoverageFrom: ['<rootDir>/src/**/*.js', '!<rootDir>/src/**/stubs/**/*.js'],
  coverageThreshold: {
    global: {
      branches: 85,
      functions: 88,
      lines: 90,
    },
  },
}
