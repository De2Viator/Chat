module.exports = {
  env: {
    browser: true,
    node: true,
    es6: true,
    jest: true,
  },
  extends: [
    'prettier',
    'eslint:recommended',
    'plugin:prettier/recommended',
    'plugin:react/recommended',
    'prettier',
    'plugin:react-hooks/recommended',
    'plugin:storybook/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', 'prettier', 'react-hooks', 'jest'],
  rules: {
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        endOfLine: 'auto',
      },
    ],
    'react/prop-types': 0,
    quotes: ['warn', 'single'],
    semi: ['warn', 'always'],
    'linebreak-style': 0,
  },
  overrides: [
    {
      files: ['webpack.config.js'],
      rules: {
        '@typescript-eslint/no-var-requires': ['off'],
      },
    },
  ],
};
