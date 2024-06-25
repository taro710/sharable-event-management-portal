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
    'no-console': 'warn',
    'prefer-template': 'error',
    'no-constant-condition': 'error',
    'arrow-body-style': [
      'error',
      'as-needed',
      { requireReturnForObjectLiteral: true },
    ],
  },
};
