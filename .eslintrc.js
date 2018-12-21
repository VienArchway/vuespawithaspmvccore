module.exports = {
    parserOptions: {
        parser: "babel-eslint",
        ecmaVersion: 2017,
        sourceType: "module"
    },
    extends: [
        "eslint:recommended",
        "plugin:vue/essential"
    ],
    env: {
        browser: true,
    },
    globals: {
        "Vue": true,
        "axios": true,
        "_": true,
        "VueRouter": true
    },
    rules: {
        indent: [2, 4],
        quotes: [2, "double"],
        eqeqeq: 2,
        semi: [2, "always"],
        "comma-dangle": 2,
        "no-eval": 2,
        "no-labels": 2,
        "no-with": 2,
        "radix": 2,
        "require-await": 2,
        "no-label-var": 2,
        "no-var": 2,
        "no-console": process.env.NODE_ENV === "production" ? 2 : 1,
        "no-debugger": process.env.NODE_ENV === "production" ? 2 : 1,
        "prefer-const": 2,
        "object-shorthand": ["error", "always"],
        "no-useless-concat": 2,
        "prefer-template": 2,
        "quote-props": [2, "as-needed", {numbers: true, keywords: false, unnecessary: true}]
    }
}