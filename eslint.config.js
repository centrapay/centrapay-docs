import globals from 'globals';
import js from '@eslint/js';
import babelParser from '@babel/eslint-parser';
import eslintPluginAstro from 'eslint-plugin-astro';
import eslintPluginVue from 'eslint-plugin-vue';
import eslintPluginJest from 'eslint-plugin-jest';

export default [
  ...eslintPluginAstro.configs.recommended,
  ...eslintPluginVue.configs['flat/recommended'],
  {
    rules: {
      'vue/html-self-closing': [
        'error',
        {
          html: {
            component: 'any',
          },
        },
      ],
      'vue/multi-word-component-names': 'off',
    }
  },
  {
    ignores: [
      '**/dist/*',
      '**/.astro/*',
      '.yarn/releases/*'
    ]
  },
  {
    files: [ '**/*.js' ],
    plugins: {
      jest: eslintPluginJest
    },
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
      ecmaVersion: 2020,
      sourceType: 'module',
      parser: babelParser,
      parserOptions: {
        parser: babelParser,
        requireConfigFile: false,
      },
    },
    rules: {
      ...js.configs.recommended.rules,
      'arrow-spacing': 'error',
      complexity: ['error', 6],
      curly: ['error', 'all'],
      indent: ['error', 2],
      'key-spacing': [
        'error',
        {
          beforeColon: false,
        },
      ],
      'linebreak-style': ['error', 'unix'],
      'no-console': 'error',
      'no-process-exit': 'off',
      'no-trailing-spaces': 'error',
      quotes: ['error', 'single'],
      semi: ['error', 'always'],
      'space-infix-ops': 'error',
      'no-shadow': 'error',
      'require-await': 'error',
      'jest/no-focused-tests': 'error',
    },
  },
  {
    files: ['**/scripts/**/*.js'],
    rules: {
      'no-console': [
        'error',
        {
          allow: ['log', 'warn', 'error'],
        },
      ],
    },
  },
];
