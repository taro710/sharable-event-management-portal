import js from '@eslint/js';

/** @type {import("eslint").Linter.FlatConfig} */
export const javascriptConfig = {
  rules: {
    ...js.configs.all.rules,
    'no-ternary': 'off',
    'sort-keys': 'off',
    'sort-imports': 'off',
    'no-undef': 'off',
    'one-var': 'off',
    'id-length': 'off',
    'max-statements': 'off',
    'max-lines-per-function': 'off',
    'no-undefined': 'off',
    'line-comment-position': 'off',
    'no-inline-comments': 'off',
    'capitalized-comments': 'off',
    'new-cap': 'off',
    'no-console': 'warn',
    'prefer-template': 'error',
    'no-constant-condition': 'error',
    'consistent-return': ['error', { treatUndefinedAsUnspecified: false }],
    'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
    'arrow-body-style': [
      'error',
      'as-needed',
      { requireReturnForObjectLiteral: true },
    ],
    'react/jsx-no-bind': 'off', // TODO: 検討
    'no-magic-numbers': 'off', // TODO: 検討
    'no-warning-comments': 'off',
  },
};
