module.exports = {
    "env": {
        "browser": true,
        "es2021": true,
        "node": true
    },
    "extends": [
      "plugin:prettier/recommended",
      "prettier",
      "eslint:recommended",
      "plugin:@typescript-eslint/recommended"
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
      "ecmaVersion": 2020,
      "sourceType": "module"
    },
    "plugins": [
        "@typescript-eslint"
    ],
    "rules": {
      "no-debugger": "off",
      "no-console": 0,
      "class-methods-use-this": "off",
      "@typescript-eslint/no-explicit-any": "error"
    }
};
