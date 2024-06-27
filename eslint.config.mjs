import parser from '@typescript-eslint/parser';
import globals from 'globals';

import { importConfig } from './.lint//eslint-import.mjs';
import { javascriptConfig } from './.lint/eslint-javascript.mjs';
import { prettierConfig } from './.lint/eslint-prettier.mjs';
import { reactConfig } from './.lint/eslint-react.mjs';

/** @type {*} */
const base = {
  files: ['**/*.ts', '**/*.tsx'],
  languageOptions: {
    globals: {
      ...globals.browser,
      ...globals.node,
      ...globals.es2024,
      ...globals.jest,
    },
    parser,
    parserOptions: {
      sourceType: 'module',
      ecmaFeatures: {
        jsx: true,
      },
      warnOnUnsupportedTypeScriptVersion: true,
    },
  },
};

export default [
  base,
  importConfig,
  reactConfig,
  javascriptConfig,
  prettierConfig,
];
