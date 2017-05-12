const env = process.env.NODE_ENV;

const plugins = [
  require.resolve("babel-plugin-transform-class-properties"),
  [require.resolve("babel-plugin-transform-object-rest-spread"), { useBuiltIns: true }],
  [require.resolve("babel-plugin-transform-react-jsx"), { useBuiltIns: true }],
  [
    require.resolve("babel-plugin-transform-runtime"),
    {
      helpers: true,
      polyfill: false,
      regenerator: false,
      moduleName: "babel-runtime"
    }
  ],
  require.resolve("babel-plugin-syntax-dynamic-import")
];

const presets = [
  [
    require.resolve("babel-preset-env"),
    {
      targets: {
        browsers: [">1%", "last 2 versions", "Firefox ESR"],
        uglify: false
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
      require.resolve("babel-plugin-transform-react-jsx-source"),
      require.resolve("babel-plugin-transform-react-jsx-self"),
      require.resolve("babel-plugin-dynamic-import-node")
    ])
  };
} else if (env === "production") {
  module.exports = {
    presets,
    plugins: plugins.concat([
      require.resolve("babel-plugin-transform-react-inline-elements"),
      require.resolve("babel-plugin-transform-react-remove-prop-types")
    ])
  };
} else {
  module.exports = {
    presets,
    plugins: plugins.concat([
      require.resolve("babel-plugin-transform-react-jsx-source"),
      require.resolve("babel-plugin-transform-react-jsx-self")
    ])
  };
}
