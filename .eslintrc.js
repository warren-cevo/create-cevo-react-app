module.exports = {
    env: {
        browser: true,
        es2021: true
    },
    extends: [
        'plugin:react/recommended',
        'standard-with-typescript'
    ],
    overrides: [
    ],
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: ['./tsconfig.json']
    },
    plugins: [
        'react'
    ],
    rules: {
        'react/react-in-jsx-scope': 'off',
        'react/jsx-filename-extension': [1, { extensions: ['.ts', '.tsx'] }],
        indent: ['error', 4],
        '@typescript-eslint/indent': ['error', 4],
        'comma-dangle': 'off',
        '@typescript-eslint/comma-dangle': 'off',
        '@typescript-eslint/restrict-template-expressions': 'off',
    },
    settings: {
        react: {
            version: 'detect',
        },
    }
}
