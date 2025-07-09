/*
 * Copyright 2025 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */
import globals from 'globals';

import bestPractices from './rules/best-practices.js';
import errors from './rules/errors.js';
import node from './rules/node.js';
import style from './rules/style.js';
import variables from './rules/variables.js';
import es6 from './rules/es6.js';
import imports from './rules/imports.js';
import strict from './rules/strict.js';

import header from './rules/header.js';

const recommended = {
  languageOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
    globals: {
      ...globals.node,
      ...globals.es6,
      __rootdir: true,
    },
    parserOptions: {
      ...es6.languageOptions.parserOptions,
    },
  },
  plugins: {
    header,
    ...imports.plugins,
  },
  rules: {
    ...bestPractices.rules,
    ...errors.rules,
    ...node.rules,
    ...style.rules,
    ...variables.rules,
    ...es6.rules,
    ...imports.rules,
    ...strict.rules,

    strict: 0,

    'import/prefer-default-export': 0,

    // Forbid multiple statements in one line
    'max-statements-per-line': ['error', { max: 1 }],

    // Allow for-of loops
    'no-restricted-syntax': ['error', 'ForInStatement', 'LabeledStatement', 'WithStatement'],

    // Allow return before else & redundant else statements
    'no-else-return': 'off',

    // allow dangling underscores for 'fields'
    'no-underscore-dangle': ['error', {
      allowAfterThis: true,
      allow: [
        '__ow_method',
        '__ow_headers',
        '__ow_path',
        '__ow_user',
        '__ow_body',
        '__ow_query'],
    }],

    // allow '_' as a throw-away variable
    'no-unused-vars': ['error', {
      argsIgnorePattern: '^_$',
      varsIgnorePattern: '^_$',
      caughtErrors: 'none',
    }],

    'no-shadow': ['error', {
      allow: ['_'],
    }],

    // don't enforce extension rules
    'import/extensions': ['error', 'ignorePackages'],

    // enforce license header
    'header/header': ['error', {
      block: [
        '',
        { pattern: ' * Copyright \\d{4} Adobe\\. All rights reserved\\.' },
        ' * This file is licensed to you under the Apache License, Version 2.0 (the "License");',
        ' * you may not use this file except in compliance with the License. You may obtain a copy',
        { pattern: ' * of the License at https?://www.apache.org/licenses/LICENSE-2.0' },
        ' *',
        ' * Unless required by applicable law or agreed to in writing, software distributed under',
        ' * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS',
        ' * OF ANY KIND, either express or implied. See the License for the specific language',
        ' * governing permissions and limitations under the License.',
        ' ',
      ],
    }],
    'id-match': ['error', '^(?!.*?([wW][hH][iI][tT][eE]|[bB][lL][aA][cC][kK]).*[lL][iI][sS][tT]).*$', {
      properties: true,
    }],
  },
  settings: {
    ...imports.settings,
  },
  linterOptions: {
    reportUnusedDisableDirectives: 'off',
  },
  ignores: ['eslint.config.js', '.releaserc.cjs'],
};

const source = {
  files: ['src/**/*.js', 'test/dev/*.mjs'],
};

const test = {
  files: ['test/**/*.js'],
  languageOptions: {
    ...recommended.languageOptions,
    globals: {
      ...recommended.languageOptions.globals,
      ...globals.mocha,
      __testdir: true,
    },
  },
};

export {
  source, test, recommended,
};
