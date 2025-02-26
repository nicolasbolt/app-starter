const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir: './',
})

const customJestConfig = {
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "babel-jest"
  },
  testEnvironment: "node",
  testMatch: [
    "**/__tests__/**/*.test.js", 
    "**/__tests__/api/**/*.test.js" // Ensure API tests are included
  ],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1"
  }
};

module.exports = createJestConfig(customJestConfig);
