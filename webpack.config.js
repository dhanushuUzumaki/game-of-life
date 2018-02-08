const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const WebpackCleanupPlugin = require('webpack-cleanup-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './src/index.html',
  filename: 'index.html',
  inject: 'body'
});
const ExtractTextPluginConfig = new ExtractTextPlugin('styles.css');
const WebpackCleanupPluginConfig = new WebpackCleanupPlugin();
const NamedModulesPlugin = new webpack.NamedModulesPlugin();
const HMRPlugin = new webpack.HotModuleReplacementPlugin();
const CopyPlugin = new CopyWebpackPlugin([{ from: 'src/static' }]);

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve('public'),
    filename: 'index.[hash].js'
  },
  devtool: 'inline-source-map',
  devServer: {
    compress: true
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })
      }
    ]
  },
  plugins: [
    WebpackCleanupPluginConfig,
    ExtractTextPluginConfig,
    CopyPlugin,
    HtmlWebpackPluginConfig,
    NamedModulesPlugin,
    HMRPlugin
  ]
};
