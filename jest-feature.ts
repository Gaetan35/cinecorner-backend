import type { Config } from 'jest';

const config: Config = {
  moduleDirectories: ['node_modules', '<rootDir>'],
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: '.',
  testEnvironment: 'node',
  testRegex: '^.+\\.feature.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  setupFilesAfterEnv: ['./features/setup.ts'],
  collectCoverage: false,
  collectCoverageFrom: ['**/*.(t|j)s'],
  coverageDirectory: 'coverage/feature',
  moduleNameMapper: {
    '~config/(.*)': '<rootDir>/src/config/$1',
    '~movie/(.*)': '<rootDir>/src/movie/$1',
    '~tmdb/(.*)': '<rootDir>/src/tmdb/$1',
    '~shared/(.*)': '<rootDir>/src/shared/$1',
  },
};

export default config;
