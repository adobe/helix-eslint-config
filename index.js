/*
 * Copyright 2019 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */
module.exports = {
  extends: [
    'eslint-config-airbnb-base',
  ].map(require.resolve),

  env: {
    node: true,
    es6: true,
  },
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2022,
  },
  plugins: [
    'header',
    'import',
  ],
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
    'import/extensions': [2, 'ignorePackages'],

    // enforce license header
    'header/header': [2, 'block', ['',
      { pattern: ' * Copyright \\d{4} Adobe\\. All rights reserved\\.', template: ' * Copyright 2024 Adobe. All rights reserved.' },
      ' * This file is licensed to you under the Apache License, Version 2.0 (the "License");',
      ' * you may not use this file except in compliance with the License. You may obtain a copy',
      ' * of the License at http://www.apache.org/licenses/LICENSE-2.0',
      ' *',
      ' * Unless required by applicable law or agreed to in writing, software distributed under',
      ' * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS',
      ' * OF ANY KIND, either express or implied. See the License for the specific language',
      ' * governing permissions and limitations under the License.',
      ' ',
    ]],

    'id-match': ['error', '^(?!.*?([wW][hH][iI][tT][eE]|[bB][lL][aA][cC][kK]).*[lL][iI][sS][tT]).*$', {
      properties: true,
    }],
  },
  settings: {
    // see
    // - https://github.com/import-js/eslint-plugin-import/issues/1810
    // - https://www.npmjs.com/package/eslint-import-resolver-exports
    'import/resolver': {
      exports: {},
    },
  },
  globals: {
    __rootdir: true,
    __testdir: true,
  },
};
