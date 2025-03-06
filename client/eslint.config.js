import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';

export default [
    { ignores: ['dist'] },
    {
        files: ['**/*.{js,jsx}'],
        languageOptions: {
            ecmaVersion: 2020,
            parserOptions: {
                ecmaVersion: 'latest',
                ecmaFeatures: { jsx: true },
                sourceType: 'module',
            },
        },
        settings: { react: { version: '18.3' } },
        plugins: {
            react,
            'react-hooks': reactHooks,
            'react-refresh': reactRefresh,
        },
        rules: {
            'react/jsx-uses-vars': 'error',
            'react/jsx-uses-react': 'error',
            'react/jsx-no-target-blank': 'off',
            'react-refresh/only-export-components': [
                'warn',
                { allowConstantExport: true },
            ],
            'default-param-last': 0,
            'no-console': 'error',
            'no-debugger': 'error',
            indent: ['error', 4, { SwitchCase: 1 }],
            'linebreak-style': 0,
            'max-len': 0,
            'no-param-reassign': ['error', {
                props: true,
                ignorePropertyModificationsFor: [
                    'acc',
                    'params',
                    'req',
                    'res',
                    'e',
                ]
            }],
            'no-shadow': 0,
            'no-unsafe-optional-chaining': 'warn',
            'no-use-before-define': ['error', {
                functions: false,
            }],
            'no-restricted-syntax': ['error', 'LabeledStatement', 'WithStatement'],
            'no-continue': 0,
            'react/multi-word-component-name': 'off',
            'no-unused-vars': 'error',
            'quotes': ['error', 'single'],
            'no-undef': 'error',
        },
    },
];
