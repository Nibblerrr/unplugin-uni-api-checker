import antfu from '@antfu/eslint-config'

export default antfu({
  rules: {
    'no-restricted-syntax': 'off',
    'style/arrow-parens': 'off',
    'no-console': 'off',
    'style/brace-style': 'off',
    curly: 'off',
    'style/quote-props': 'off',
  },
})
