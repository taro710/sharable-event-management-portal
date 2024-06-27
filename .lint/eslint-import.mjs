import imports from 'eslint-plugin-import';
import unused from 'eslint-plugin-unused-imports';

/** @type {import("eslint").Linter.FlatConfig} */
export const importConfig = {
  plugins: { unused, imports },
  rules: {
    'unused/no-unused-imports': 'error',
    'imports/order': [
      'error',
      {
        groups: [
          'builtin',
          'external',
          'internal',
          ['parent', 'sibling'],
          'object',
          'type',
          'index',
        ],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
        },
      },
    ],
  },
};
