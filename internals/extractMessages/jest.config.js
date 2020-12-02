module.exports = {
  globals: {
    'ts-jest': {
      tsConfig: 'internals/ts-node.tsconfig.json',
    },
  },
  testMatch: [
    '**/__tests__/**/*.+(ts|tsx|js)',
    '**/?(*.)+(spec|test).+(ts|tsx|js)',
  ],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
};
