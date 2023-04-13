module.exports = {
    '*.{ts,tsx}': [
        'eslint --ext ./src/**/*.{ts,tsx} --max-warnings=79',
        'eslint',
        'prettier --write ./src/**/*.{js,jsx,ts,tsx}',
    ],
    // '**/*.ts?(x)': () => 'npm run check-types',
    '*.{json,yaml}': ['prettier --write'],
}
