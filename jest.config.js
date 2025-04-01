module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jest-environment-jsdom',
    transform: {
      '^.+\\.(ts|tsx|js|jsx)$': 'babel-jest',
      '^.+\\.scss$': 'jest-css-modules-transform',
    },
    moduleNameMapper: {
      '^@/(.*)$': '<rootDir>/src/$1',
      '^@features/(.*)$': '<rootDir>/src/features/$1',
      '^@stores/(.*)$': '<rootDir>/src/stores/$1',
      '^@assets/(.*)$': '<rootDir>/src/assets/$1',
      '\\.(css|scss)$': 'identity-obj-proxy',
      '\\.(svg|png|jpg|jpeg|gif)$': '<rootDir>/__mocks__/fileMock.js',
    },
    setupFilesAfterEnv: ['@testing-library/jest-dom'],
  };