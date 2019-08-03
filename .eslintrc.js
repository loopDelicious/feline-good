module.exports = {
  parser: "babel-eslint",
  extends: ["standard"],
  parserOptions: {
    ecmaVersion: 7,
    ecmaFeatures: {
      jsx: true,
      modules: true
    }
  },
  env: {
    jest: true
  },
  rules: {
    "react/jsx-uses-vars": 2,
    "no-console": ["warn", { allow: ["warn", "error"] }],
    "no-return-assign": 0,
    "require-await": 0,
    quotes: ["error", "single"],
    "no-return-await": 0,
    "no-unused-vars": [
      1,
      {
        vars: "all",
        args: "none",
        varsIgnorePattern: "^(React$|_)"
      }
    ],
    "standard/computed-property-even-spacing": 0,
    camelcase: 0,
    "object-curly-spacing": ["error", "always"]
  },
  plugins: ["react"],
  settings: {
    react: {
      createClass: "createReactClass",
      pragma: "React",
      version: "detect"
    }
  }
};
