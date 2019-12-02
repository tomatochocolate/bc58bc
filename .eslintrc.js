module.exports = {
    root: true,
    env: {
        node: true
    },
    extends: [
        'plugin:vue/essential',
        '@vue/standard'
    ],
    plugins: [
        'vue'
    ],
    parserOptions: {
        parser: 'babel-eslint'
    },
    rules: {
        // 'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        // 'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'arrow-parens': 0,
        'generator-star-spacing': 0,
        'indent': 0,
        'require-jsdoc': [ 'error', {
            'require': {
                'ArrowFunctionExpression': false,
                'FunctionDeclaration': true,
                'MethodDefinition': false,
                'ClassDeclaration': false
            }
        } ],
        'semi-spacing': [ 'error', {
            'before': false,
            'after': true
        } ],
        'no-trailing-spaces': [ 'error', {
            'skipBlankLines': true
        } ],
        'space-before-blocks': [ 'error', 'always' ],
        'space-infix-ops': [ 'error', {
            'int32Hint': true
        } ],
        'space-before-function-paren': [ 'error', {
            'anonymous': 'always',
            'named': 'always',
            'asyncArrow': 'ignore'
        } ],
        'array-bracket-spacing': [ 'error', 'always' ],
        'comma-spacing': [ 'error', {
            'before': false,
            'after': true
        } ],
        'max-statements-per-line': [ 'error', {
            'max': 1
        } ],
        'newline-per-chained-call': [ 'error', {
            'ignoreChainWithDepth': 4
        } ],
        'object-curly-spacing': [ 'error', 'always' ],
        'comma-style': [ 'error', 'last' ],
        'quotes': [ 'error', 'single' ],
        'dot-notation': 'error',
        'block-spacing': 'error',
        'brace-style': 'error',
        'camelcase': 0,
        'no-multiple-empty-lines': [ 'error', {
            'max': 2,
            'maxBOF': 1,
            'maxEOF': 1
        } ],
        'object-property-newline': 0,
        'vue/script-indent': [ 'error', 4, {
            'baseIndent': 1,
            'switchCase': 1
        } ],
        'vue/no-parsing-error': [ 2, {
            'x-invalid-end-tag': false
        } ]
    }
}
