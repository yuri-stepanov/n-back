const { resolve } = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const resolvePath = path => resolve(__dirname, path);
const buildPath = resolvePath('docs');

module.exports = {
  entry: {
    app: resolvePath('src/index.js'),
  },
  output: {
    filename: '[name].js',
    path: buildPath,
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: { minimize: true },
          },
        ],
      },
      {
        test: /\.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        loader: 'url-loader',
        options: {
          limit: 50000,
          name: '[name].[ext]',
        },
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [resolve('./src'), resolve('./node_modules')],
  },
  plugins: [
    new CleanWebpackPlugin([buildPath]),
    new HtmlWebPackPlugin({
      template: './static/index.html',
      filename: './index.html',
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: '[name].css',
    }),
    new CopyWebpackPlugin([
      { from: './static/icons/', to: buildPath + '/icons' },
      { from: './static/manifest.json', to: buildPath },
      { from: './src/serviceWorker.js', to: buildPath },
    ]),
  ],
};
