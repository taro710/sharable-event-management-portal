import parser from '@typescript-eslint/parser';

import { importConfig } from './eslint-import.mjs';
import { javascriptConfig } from './eslint-javascript.mjs';
import { prettierConfig } from './eslint-prettier.mjs';
import { reactConfig } from './eslint-react.mjs';

/** @type {import("eslint").Linter.FlatConfig[]} */
const base = {
  files: ['**/*.ts', '**/*.tsx'], // TODO:
  languageOptions: {
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
