module.exports = {
  verbose: true,
  globals: {
    NODE_ENV: "test"
  },
  transform: {
    '.js': 'jest-esm-transformer',
  },
  testRegex: "(/test/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.js',
    "!index.js",
    "!src/config/**",
    "!src/infrastructure/index.js",
    "!src/components/smartmei/jobs/index.js"
  ]
}