/** @type {import('ts-jest').JestConfigWithTsJest} */
// @ts-nocheck

export default {
  preset: 'ts-jest/presets/default-esm',
  roots: ['<rootDir>/tests'],
  testEnvironment: 'node',
  extensionsToTreatAsEsm: ['.ts'],
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        useESM: true,
        tsconfig: 'tsconfig.json',
      },
    ],
  },
};
