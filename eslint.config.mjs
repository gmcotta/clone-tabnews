import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import noSecrets from 'eslint-plugin-no-secrets';
import pluginJest from 'eslint-plugin-jest';

const eslintConfig = defineConfig([
  // Next
  ...nextVitals,
  globalIgnores(['.next/**', 'out/**', 'build/**', 'next-env.d.ts']),
  // No secrets
  {
    files: ['**/*.js'],
    ignores: ['eslint.config.mjs'],
    plugins: {
      'no-secrets': noSecrets
    },
    rules: {
      'no-secrets/no-secrets': [
        'error',
        { additionalRegexes: { 'Other Secrets': 'secret' } }
      ]
    }
  },
  // Jest
  {
    files: ['**/*.spec.js', '**/*.test.js'],
    plugins: { jest: pluginJest },
    languageOptions: {
      globals: pluginJest.environments.globals.globals
    },
    rules: {
      'jest/no-disabled-tests': 'warn',
      'jest/no-focused-tests': 'error',
      'jest/no-identical-title': 'error',
      'jest/prefer-to-have-length': 'warn',
      'jest/valid-expect': 'error'
    }
  },
  eslintPluginPrettierRecommended
]);

export default eslintConfig;
