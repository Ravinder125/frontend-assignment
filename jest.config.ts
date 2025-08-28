/** @type {import('jest').Config} */
export default {
  preset: "ts-jest", // ✅ TS support
  testEnvironment: "jsdom", // ✅ DOM environment for React
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1", // ✅ if using @ as alias
  },
};
