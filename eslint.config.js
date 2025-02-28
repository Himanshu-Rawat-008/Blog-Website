import pluginJs from '@eslint/js';


/** @type {import('eslint').Linter.Config[]} */
export default [
    pluginJs.configs.recommended,
    {
        rules: {
            'no-unused-vars': 'warn',
            'no-undef': 'warn',
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
            'quotes': ['error', 'single'],
        }
    }
];