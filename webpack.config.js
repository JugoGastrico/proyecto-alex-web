const path = require("path");
const postCSSPlugins = [
  require("postcss-simple-vars"),
  require("postcss-nested"),
  require("autoprefixer"),
  require("postcss-import"),
];

module.exports = {
  entry: "./app/assets/scripts/App.js",
  output: {
    filename: "bundled.js",
    path: path.resolve(__dirname, "app"),
  },
  mode: "development",

  devServer: {
    before: function (app, server) {
      server._watch("./app/**/*html");
    },
    contentBase: path.join(__dirname, "app"),
    compress: true,
    port: 5000,
    host: "0.0.0.0",
  },

  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          "style-loader",
          "css-loader?url=false",
          {
            loader: "postcss-loader",
            options: { postcssOptions: { plugins: postCSSPlugins } },
          },
        ],
      },
    ],
  },
};
