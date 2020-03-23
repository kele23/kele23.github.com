module.exports = {
    root: true,
    env: {
        browser: true,
        node: true,
        es6: true
    },
    parserOptions: {
        ecmaVersion: 8,
        parser: 'babel-eslint',
        sourceType: 'module'
    },
    extends: ['eslint:recommended', 'prettier'],
    plugins: ['prettier'],
    // add your custom rules here
    rules: {}
};
