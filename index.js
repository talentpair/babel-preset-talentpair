"use strict";

const path = require("path");

const env = process.env.BABEL_ENV || process.env.NODE_ENV;
if (env !== "development" && env !== "test" && env !== "production") {
  throw new Error(
    'Using `babel-preset-react-app` requires that you specify `NODE_ENV` or `BABEL_ENV` environment variables. Valid values are "development", "test", and "production". Instead, received: ' +
      JSON.stringify(env)
  );
}

const plugins = [
  // Necessary to include regardless of the environment because
  // in practice some other transforms (such as object-rest-spread)
  // don't work without it: https://github.com/babel/babel/issues/7215
  require.resolve("babel-plugin-transform-es2015-destructuring"),
  require.resolve("babel-plugin-transform-class-properties"),
  [
    require.resolve("babel-plugin-transform-object-rest-spread"),
    { useBuiltIns: true }
  ],
  [require.resolve("babel-plugin-transform-react-jsx"), { useBuiltIns: true }],
  [
    require.resolve("babel-plugin-transform-runtime"),
    {
      helpers: true,
      polyfill: false,
      regenerator: false
    }
  ],
  require.resolve("babel-plugin-syntax-dynamic-import")
];

const presets = [
  [
    require.resolve("babel-preset-env"),
    {
      targets: {
        browsers: [">0.5%", "last 2 versions", "Firefox ESR", "not dead"]
      },
      useBuiltIns: true,
      modules: false
    }
  ],
  require.resolve("babel-preset-react")
];

if (env === "test") {
  module.exports = {
    presets: [
      [require("babel-preset-env").default, { targets: { node: "current" } }],
      require.resolve("babel-preset-react")
    ],
    plugins: plugins.concat([
      require.resolve("./use-redux-form-cjs"),
      require.resolve("babel-plugin-transform-react-jsx-source"),
      require.resolve("babel-plugin-transform-react-jsx-self"),
      require.resolve("babel-plugin-dynamic-import-node")
    ])
  };
} else if (env === "production") {
  module.exports = {
    presets,
    plugins: plugins.concat([
      [
        require.resolve("babel-plugin-lodash"),
        { id: ["lodash", "lodash-es", "recompose"] }
      ],
      require.resolve("./use-lodash-es"),
      require.resolve("babel-plugin-transform-react-inline-elements"),
      require.resolve("babel-plugin-transform-react-remove-prop-types")
    ])
  };
} else {
  module.exports = {
    presets,
    plugins: plugins.concat([
      [
        require.resolve("babel-plugin-lodash"),
        { id: ["lodash", "lodash-es", "recompose"] }
      ],
      require.resolve("./use-lodash-es"),
      require.resolve("babel-plugin-transform-react-jsx-source"),
      require.resolve("babel-plugin-transform-react-jsx-self")
    ])
  };
}
