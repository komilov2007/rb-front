module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  globals: {
    React: true,
    JSX: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'standard-with-typescript',
    'plugin:react-hooks/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  overrides: [
    {
      files: ['!**/.eslintrc.cjs'],
    },
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  plugins: [
    'react',
    'react-hooks',
    'react-refresh',
    '@tanstack/query',
    '@typescript-eslint',
    'prettier',
  ],
  rules: {
    camelcase: 'off',
    'no-unused-vars': 'warn',
    'spaced-comment': 'error',
    'no-useless-escape': 'off',
    quotes: ['error', 'single'],
    'react/display-name': 'off',
    'prettier/prettier': 'error',
    'no-duplicate-imports': 'error',
    'react/react-in-jsx-scope': 'off',
    'react/no-unescaped-entities': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    '@typescript-eslint/ban-ts-comment': 'off',
    '@tanstack/query/exhaustive-deps': 'error',
    '@typescript-eslint/naming-convention': 'off',
    '@typescript-eslint/prefer-ts-expect-error': 'off',
    '@tanstack/query/prefer-query-object-syntax': 'error',
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/no-misused-promises': 'off',
    '@typescript-eslint/triple-slash-reference': 'off',
    '@typescript-eslint/prefer-nullish-coalescing': 'off',
    '@typescript-eslint/consistent-type-imports': 'error',
    '@typescript-eslint/strict-boolean-expressions': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/restrict-template-expressions': 'off',
    'no-restricted-imports': [
      'error',
      {
        patterns: ['@mui/*/*/*/*'],
      },
    ],
  },
};
