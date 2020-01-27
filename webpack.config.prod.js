const WebpackMerge = require("webpack-merge");
const WebpackConfigBase = require("./webpack.config.base");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

const WebpackConfigProd = WebpackMerge(WebpackConfigBase, {
  mode: "production",

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: "babel-loader"
      }
    ]
  },

  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        test: /\.js$/,
        exclude: /node_modules/
      })
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      hash: false,
      template: `${WebpackConfigBase.externals.paths.src}/index.html`,
      filename: "index.html",
      base: false,
      inject: false,
      minify: {
        collapseWhitespace: true,
        removeComments: true
      }
    })
  ]
});

module.exports = WebpackConfigProd;
