import type { Config } from 'jest';

const config: Config = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: 'src',
  testRegex: '.*\\.test\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverage: false,
  collectCoverageFrom: ['**/*.(t|j)s'],
  coverageDirectory: '../coverage/unit',
  coverageReporters: ['json'],
  testEnvironment: 'node',
  moduleNameMapper: {
    '~config/(.*)': '<rootDir>/config/$1',
    '~movie/(.*)': '<rootDir>/movie/$1',
    '~tmdb/(.*)': '<rootDir>/tmdb/$1',
    '~shared/(.*)': '<rootDir>/shared/$1',
  },
};

export default config;
