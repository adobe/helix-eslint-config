# Helix eslint config

ESLint config used in helix projects.

## Usage

### For ESLint v9.x

In your `eslint.config.js`, import the `recommended` settings, `source` and `test` configurations and add your ignores, e.g.:

```
import { defineConfig, globalIgnores } from '@eslint/config-helpers'
import { recommended, source, test } from '@adobe/eslint-config-helix';

export default defineConfig([
  globalIgnores([
    '.vscode/*',
    'coverage/*',
    'dist/*',
  ]),
  {
    extends: [recommended],
  },
  source,
  test,
]);
```

## Status

[![CircleCI](https://img.shields.io/circleci/project/github/adobe/helix-eslint-config.svg)](https://circleci.com/gh/adobe/helix-eslint-config)
[![GitHub license](https://img.shields.io/github/license/adobe/helix-eslint-config.svg)](https://github.com/adobe/helix-eslint-config/blob/main/LICENSE.txt)
[![GitHub issues](https://img.shields.io/github/issues/adobe/helix-eslint-config.svg)](https://github.com/adobe/helix-eslint-config/issues)

## Development


### Build

```bash
npm install
```

### Test

```bash
npm test
```

### Lint

```bash
npm run lint
```
