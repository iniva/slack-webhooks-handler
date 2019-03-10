module.exports = { // eslint-disable-line import/no-commonjs
    testMatch: [
        '<rootDir>/src/**/?(*.)test.js'
    ],
    testPathIgnorePatterns: [
        '/node_modules/',
        '<rootDir>/src/config/test.js',
	'<rootDir>/lib/'
    ],
    testEnvironment: 'node',
    coverageReporters: [
        'text-summary',
        'html', 
        'lcov'
    ],
    collectCoverageFrom: [
        'src/**/*.js'
    ]
};
