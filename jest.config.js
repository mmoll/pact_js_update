module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  collectCoverage: true,
  collectCoverageFrom: ["./components/**/*.{ts,tsx}", "./utils/**/*.{ts,tsx}"],
  coverageReporters: ["json-summary", "text", "lcov"],
  setupFiles: ["./tests/jest/jestSetup.ts"],
  setupFilesAfterEnv: ["./tests/jest/jestSetupAfterEnvironment.ts"],
  transform: {
    "\\.(js|jsx|ts|tsx)$": "@sucrase/jest-plugin",
  },
  moduleNameMapper: {
    "\\.css$": "identity-obj-proxy",
    "\\.png$": "identity-obj-proxy",
  },
};
