module.exports = {
  presets: [
    [
      require("babel-preset-env"),
      {
        targets: {
          browsers: [">1%", "last 2 versions", "Firefox ESR"],
          uglify: false
        },
        useBuiltIns: true,
        modules: false
      }
    ],
    require("babel-preset-react")
  ],
  plugins: [
    require("babel-plugin-transform-class-properties"),
    [require("babel-plugin-transform-object-rest-spread"), { useBuiltIns: true }],
    [require("babel-plugin-transform-react-jsx"), { useBuiltIns: true }],
    [
      require("babel-plugin-transform-runtime"),
      {
        helpers: true,
        polyfill: false,
        regenerator: false,
        moduleName: "babel-runtime"
      }
    ],
    require("babel-plugin-syntax-dynamic-import")
  ],
  env: {
    development: {
      plugins: [
        require("babel-plugin-transform-react-jsx-source"),
        require("babel-plugin-transform-react-jsx-self")
      ]
    },
    production: {
      plugins: [
        require("babel-plugin-transform-react-inline-elements"),
        require("babel-plugin-transform-react-remove-prop-types")
      ]
    },
    test: {
      presets: [
        [require("babel-preset-env"), { targets: { node: "current" } }],
        require("babel-preset-react")
      ],
      plugins: [
        require("babel-plugin-transform-react-jsx-source"),
        require("babel-plugin-transform-react-jsx-self"),
        require("babel-plugin-dynamic-import-node")
      ]
    }
  }
};
