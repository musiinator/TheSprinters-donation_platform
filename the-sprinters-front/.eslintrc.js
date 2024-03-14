module.exports = {
  extends: ['mantine', 'plugin:@next/next/recommended', 'plugin:jest/recommended'],
  plugins: ['testing-library', 'jest'],
  overrides: [
    {
      files: ['**/?(*.)+(spec|test).[jt]s?(x)'],
      extends: ['plugin:testing-library/react'],
    },
  ],
  parserOptions: {
    project: './tsconfig.json',
  },
  rules: {
    'react/react-in-jsx-scope': 'off',
    'import/extensions': 'off',
    'jsx-quotes': 'off',
    'react/self-closing-comp': 'off',
    '@typescript-eslint/no-extra-semi': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    'comma-dangle': 'off',
    '@typescript-eslint/semi': 'off',
    'eol-last': 'off',
    'no-trailing-spaces': 'off',
    '@typescript-eslint/quotes': 'off',
    '@typescript-eslint/object-curly-spacing': 'off',
    'arrow-body-style': 'off',
    'react/jsx-tag-spacing': 'off',
    'react/jsx-indent-props': 'off',
    'no-restricted-syntax': 'off',
    'react/jsx-first-prop-new-line': 'off',
    'key-spacing': 'off',
    'react/jsx-max-props-per-line': 'off',
    'react/jsx-closing-bracket-location': 'off',
    'padded-blocks': 'off',
    'max-len':'off',
    '@typescript-eslint/brace-style': 'off',
    '@typescript-eslint/no-use-before-define': 'off'
  },
};
