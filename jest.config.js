module.exports = {
  transformIgnorePatterns: [
    "node_modules",
  ],
  preset: "jest-preset-angular",
  setupTestFrameworkScriptFile: "<rootDir>/src/test.ts",
  testMatch: ["<rootDir>/src/**/*.spec.ts"],
};
