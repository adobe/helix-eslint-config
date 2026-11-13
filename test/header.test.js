/*
 * Copyright 2026 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */
import { describe, it } from 'node:test';
import { RuleTester } from 'eslint';
// eslint-disable-next-line import/no-unresolved -- package only declares "exports"
import tsParser from '@typescript-eslint/parser';
import header from '../rules/header.js';

RuleTester.describe = describe;
RuleTester.it = it;
RuleTester.itOnly = it.only;

const options = [{
  block: [
    '',
    { pattern: '^ \\* Copyright \\d{4} Adobe\\. All rights reserved\\.$' },
    ' * Licensed under Apache-2.0.',
    ' ',
  ],
}];

const HEADER = '/*\n * Copyright 2026 Adobe. All rights reserved.\n * Licensed under Apache-2.0.\n */\n';
const WRONG_HEADER = '/*\n * Copyright 2026 Someone Else.\n * Licensed under Apache-2.0.\n */\n';

const tests = {
  valid: [
    { code: `${HEADER}export const a = 1;\n`, options },
    { code: `#!/usr/bin/env node\n${HEADER}export const a = 1;\n`, options },
    { code: `${HEADER}// another comment\nexport const a = 1; // trailing\n`, options },
    { code: HEADER, options },
  ],
  invalid: [
    { code: 'export const a = 1;\n', options, errors: [{ messageId: 'missingHeader' }] },
    { code: '// line comment\nexport const a = 1;\n', options, errors: [{ messageId: 'missingHeader' }] },
    { code: `export const a = 1;\n${HEADER}`, options, errors: [{ messageId: 'missingHeader' }] },
    { code: `${WRONG_HEADER}export const a = 1;\n`, options, errors: [{ messageId: 'headerContentMismatch' }] },
  ],
};

const parsers = {
  espree: {},
  '@typescript-eslint/parser': { parser: tsParser },
};

describe('header rule', () => {
  Object.entries(parsers).forEach(([name, languageOptions]) => {
    describe(name, () => {
      new RuleTester({ languageOptions }).run('header', header.rules.header, tests);
    });
  });
});
