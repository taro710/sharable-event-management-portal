import react from 'eslint-plugin-react';

/** @type {import("eslint").Linter.FlatConfig} */
export const reactConfig = {
  plugins: { react },
  rules: {
    ...react.configs.all.rules,
    'react/jsx-boolean-value': 'error',
    'react/jsx-curly-brace-presence': [
      'error',
      { props: 'never', children: 'never' },
    ],
    'react/jsx-no-leaked-render': ['error', { validStrategies: ['ternary'] }],
    'react/jsx-filename-extension': ['error', { extensions: ['.jsx', 'tsx'] }],
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/jsx-max-depth': 'off',
  },
};
