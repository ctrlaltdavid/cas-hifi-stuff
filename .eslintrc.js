module.exports = {
    root: true,
    extends: "eslint:recommended",
    globals: {
        // Global objects.
        "print" : false,
        "Script": false,
        "Tablet": false
    },
    rules: {
        // Best practices.
        "block-scoped-var": "error",
        "curly": ["error"],
        "consistent-return": "error",
        "eqeqeq": ["error", "always"],
        "no-else-return": ["error", { allowElseIf: false }],
        "no-eval": ["error"],
        "no-floating-decimal": ["error"],
        "no-implicit-globals": "error",
        "no-implied-eval": ["error"],
        "no-lone-blocks": "error",
        "no-multi-spaces": ["error", { ignoreEOLComments: true }],
        "no-param-reassign": "error",
        "no-useless-return": "error",
        "vars-on-top": "error",

        // Strict mode.
        "strict": ["error", "function"],

        // Variables.
        "no-use-before-define": "error",

        // Stylistic issues.
        "array-bracket-spacing": ["error", "never"],
        "block-spacing": "error",
        "brace-style": "error",
        "camelcase": "error",
        "capitalized-comments": ["error", "always", { "ignoreConsecutiveComments": true }],
        "comma-dangle": ["error", "never"],
        "eol-last": ["error", "always"],
        "func-call-spacing": ["error", "never"],
        "indent": ["error", 4, { SwitchCase: 1 }],
        "key-spacing": ["error"],
        "keyword-spacing": ["error", { before: true, after: true }],
        "max-len": ["error", 128, 4],
        "new-cap": "error",
        "new-parens": "error",
        "no-plusplus": ["error", { "allowForLoopAfterthoughts": true }],
        "no-trailing-spaces": "error",
        "one-var": ["error", "always"],
        "semi": ["error", "always"]
    }
};
