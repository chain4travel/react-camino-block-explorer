module.exports = {
    '*.{js,jsx,ts,tsx}': ['eslint --ext .ts,.tsx ./src', 'eslint'],
    // '**/*.ts?(x)': () => 'npm run check-types',
    '*.{json,yaml}': ['prettier --write'],
}
