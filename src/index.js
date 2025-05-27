/*
 * Copyright 2024 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */
import globals from 'globals';

import bestPractices from '../rules/best-practices.js';
import errors from '../rules/errors.js';
import es6 from '../rules/es6.js';
import node from '../rules/node.js';
import strict from '../rules/strict.js';
import variables from '../rules/variables.js';

import headers from "eslint-plugin-headers";

const common = {
  ...bestPractices,
  ...errors,
  ...es6,
  ...node,
  ...strict,
  ...variables,

  languageOptions: {
    ecmaVersion: 2022,
    sourceType: "module",
    globals: {
      ...globals.node,
      ...globals.es6,
    }
  },
  plugins: {
    headers,
  },
  rules: {
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
    }],

    'no-shadow': ['error', {
      allow: ['_'],
    }],

    // don't enforce extension rules
    // 'import/extensions': [2, 'ignorePackages'],

    // enforce license header
    'headers/header-format': [
      'error',
      {
        source: 'string',
        content: `
 * Copyright 2024 Adobe. All rights reserved.'
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
`,
      }
    ],
    'id-match': ['error', '^(?!.*?([wW][hH][iI][tT][eE]|[bB][lL][aA][cC][kK]).*[lL][iI][sS][tT]).*$', {
      properties: true,
    }],
  },
  files: ['*.js'],
  linterOptions: {
    reportUnusedDisableDirectives: 'off',
  },
};

const source = {
  files: ['src/**/*.js', 'test/dev/*.mjs'],
};

const test = {
  languageOptions: {
    globals: {
      ...globals.mocha,
    },
  },
  files: ['test/**/*.js'],
};

export { common, source, test };
