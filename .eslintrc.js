// http://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
  },
  // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
  extends: 'standard',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // add your custom rules here
  'rules': {
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'eqeqeq': 'error',
    'no-await-in-loop': 'error',
    'no-console': 'off',
    'no-else-return': 'error',
    'no-self-compare': 'error',
    'no-undef-init': 'error',
    'no-unused-vars': 'warn',
    'no-useless-concat': 'error',
    'no-useless-escape': 'error',
    'no-useless-return': 'error',

    'arrow-body-style': ['error', 'always'],
    'arrow-spacing': ['error', { 'before': true, 'after': true }],
    'block-spacing': ['error', 'always'],
    'brace-style': 'error',
    'camelcase': 'error',
    'comma-dangle': ['error', 'never'],
    'comma-spacing': ['error', { 'before': false, 'after': true }],
    'comma-style': ['error', 'last'],
    'func-call-spacing': ['error', 'never'],
    'indent': ['error', 4],
    'key-spacing': ['error', {'beforeColon': false, 'afterColon': true, 'mode': 'strict'}],
    'linebreak-style': ['error', 'unix'],
    'newline-before-return': 'error',
    'no-lonely-if': 'error',
    'no-trailing-spaces': 'error',
    'no-var': 'error',
    'no-whitespace-before-property': 'error',
    // 'object-curly-newline': ['error', { 'multiline': true }],
    'object-curly-spacing': ['error', 'never'],
    'prefer-const': 'error',
    'semi': ['error', 'never'],
    'space-before-blocks': ['error', 'always'],
    'space-in-parens': ['error', 'never'],
    'spaced-comment': ['error', 'always']
  }
}
