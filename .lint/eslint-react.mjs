import react from 'eslint-plugin-react';

/** @type {import("eslint").Linter.FlatConfig} */
export const reactConfig = {
  plugins: { react },
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    ...react.configs.all.rules,
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/jsx-max-depth': 'off',
    'react/jsx-no-literals': 'off',
    'react/prefer-read-only-props': 'off',
    'react/require-default-props': 'off',
    'react/forbid-component-props': 'off',
    'react/jsx-boolean-value': 'error',
    'react/jsx-no-leaked-render': ['error', { validStrategies: ['ternary'] }],
    'react/jsx-filename-extension': ['error', { extensions: ['.jsx', 'tsx'] }],
    'react/jsx-sort-props': ['error', { callbacksLast: true }],
    'react/self-closing-comp': ['error', { component: true, html: true }],
    'react/jsx-curly-brace-presence': [
      'error',
      { props: 'never', children: 'never' },
    ],
    'react/function-component-definition': [
      'error',
      { namedComponents: 'arrow-function' },
    ],
  },
};
