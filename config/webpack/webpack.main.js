const webpack = require("webpack");
const path = require("path");
const fs = require('fs');
const PATH = require("./build_path");

const ExtractTextPlugin = require("extract-text-webpack-plugin");
const postcssImport = require("postcss-import");
const cssnext = require("postcss-cssnext");
const postcssReporter = require("postcss-reporter");
const ManifestPlugin = require('webpack-manifest-plugin');
const CleanPlugin = require('clean-webpack-plugin');

const entryFiles = fs.readdirSync(PATH.ENTRY_PATH);
const entries = {};
entryFiles
  .filter(file =>
    file.split('.')[0] && file.split('.').slice(-1)[0] === 'js'
  )
  .forEach(file => {
    const filename = file.split('.')[0];
    const filepath = path.join(PATH.ENTRY_PATH, file)
    entries[filename] = filepath;
});

module.exports = {
  context: PATH.ROOT_PATH,
  entry: entries,
  output: {
    path: PATH.BUILD_PATH,
    filename: "[name].bundle.js",
  },
  resolve: {
    extensions: ["", ".js", ".jsx"]
  },
  module: {
    loaders: [
      {test: require.resolve("jquery"), loader: "expose?jQuery"},
      {test: require.resolve("jquery"), loader: "expose?$"},
      // {test: /\.less$/, loader: ExtractTextPlugin.extract("style", "css!less")},
      {test: /\.css$/, loader: ExtractTextPlugin.extract("style", "css!postcss")},
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        loader: ["babel-loader"],
        query: {
          presets: ["es2015", "react"]
        }
      },
      // image & font
      {test: /\.(woff|woff2|eot|ttf|otf)$/i, loader: "url-loader?limit=8192&name=[name].[ext]"},
      {test: /\.(jpe?g|png|gif|svg)$/i, loader: "url-loader?limit=8192&name=[name].[ext]"}
    ]
  },
  postcss: function() {
    return [
      postcssImport({
        addDependencyTo: webpack
      }),
      cssnext({autoprefixer: {browsers: "ie >= 9, ..."}}),
      postcssReporter({clearMessages: true})
    ];
  },
  plugins: [
    new ExtractTextPlugin("[name].bundle.css", {
      allChunks: true
    }),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery"
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: "common",
      minChunks: Infinity
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
    new ManifestPlugin({
      fileName: 'webpack_manifest.json'
    }),
    new CleanPlugin(PATH.BUILD_PATH, {
      root: PATH.ROOT_PATH,
      verbose: true
    })
  ],
  debug: true,
  displayErrorDetails: true,
  outputPathinfo: true,
  devtool: "cheap-module-eval-source-map",
}
