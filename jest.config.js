const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir: './',
})

const customJestConfig = {
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "babel-jest"
  },
  // Add extensionsToTreatAsEsm for ES modules
  extensionsToTreatAsEsm: ['.jsx', '.ts', '.tsx'],
  projects: [
    {
      displayName: 'ui',
      testEnvironment: "jsdom",
      testMatch: [
        "**/__tests__/**/*.test.js",
        "!**/__tests__/api/**/*.test.js" // Exclude API tests
      ],
      moduleNameMapper: {
        "^@/(.*)$": "<rootDir>/$1"
      }
    },
    {
      displayName: 'api',
      testEnvironment: "node",
      testMatch: [
        "**/__tests__/api/**/*.test.js" // Only API tests
      ],
      moduleNameMapper: {
        "^@/(.*)$": "<rootDir>/$1"
      }
    },
  ],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1"
  }
};

// The Next.js setup should handle most of the configuration
module.exports = createJestConfig(customJestConfig);
