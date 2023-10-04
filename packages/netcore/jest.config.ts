/* eslint-disable */
export default {
  displayName: 'netcore',
  preset: '../../jest.preset.js',
  transform: {
    '^.+\\.[tj]s$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.spec.json' }],
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory: '../../coverage/packages/netcore',
  collectCoverage: true,
  coverageReporters: ['json-summary', 'text', 'lcov'],
  collectCoverageFrom: ['./src/**'],
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/__tests__/',
    '.*/library/files/.*',
  ],
};
