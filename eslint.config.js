import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'

export default [
    { ignores: ['dist'] },
    {
        files: ['**/*.{js,jsx}'],
        languageOptions: {
            ecmaVersion: 2020,
            globals: globals.browser,
            parserOptions: {
                ecmaVersion: 'latest',
                ecmaFeatures: { jsx: true },
                sourceType: 'module',
            },
        },
        plugins: {
            'react-hooks': reactHooks,
            'react-refresh': reactRefresh,
        },
        rules: {
            ...js.configs.recommended.rules,
            ...reactHooks.configs.recommended.rules,
            // keep reporting unused variables, but do NOT report unused function parameters
            // (args: 'none') — if you prefer to only ignore params that start with '_' use
            // argsIgnorePattern: '^_'
            'no-unused-vars': [
                'warn',
                { varsIgnorePattern: '^[A-Z_]', args: 'none', ignoreRestSiblings: true },
            ],
            'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
        },
    },
]
