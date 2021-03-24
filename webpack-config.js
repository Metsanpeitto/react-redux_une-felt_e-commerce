const path = require("path");

const config = {
  context: __dirname,
  entry: "./src/App.jsx",
  devtool: "cheap-eval-source-map",
  output: {
    path: path.join(__dirname, "public/js"),
    filename: "bundle.js",
  },
  resolve: {
    extensions: [".jsx", ".js", ".json"],
  },
  module: {
    rules: [{ test: /\.jsx?$/, loader: "babel-loader" }],
  },
  mode: "development",
};

module.exports = config;
