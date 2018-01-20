const { resolve } = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = function createConfig({ distFolder, srcFolder, rootFolder }) {
  return {
    // folder for root source files
    context: resolve(rootFolder, srcFolder),
    // where to put our bundled code
    output: {
      filename: 'bundle.js',
      path: resolve(rootFolder, distFolder),
    },
    module: {
      rules: [
        // transpile `.js` files with babel
        // presets are in separate .babelrc file
        {
          test: /\.(js|jsx)$/,
          loader: 'babel-loader',
          include: resolve(rootFolder, srcFolder),
        },
        // loading fonts
        {
          test: /\.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
          loader: 'url-loader',
          options: {
            limit: 50000,
            name: `[name].[ext]`,
          },
        },
      ],
    },
    // with that we are saying to webpack to look into 2 folders for modules
    // 1) our `srcFolder`
    // 2) `node_modules`
    resolve: {
      extensions: ['.js', '.jsx'],
      modules: [resolve(rootFolder, srcFolder), resolve(rootFolder, 'node_modules')],
    },
    plugins: [
      // index.html will be created using 'template/index.html'
      // with all necessary <script> tags
      new HtmlWebpackPlugin({
        template: resolve(rootFolder, 'template/index.html'),
      }),
      // clean build folder before each build
      new CleanWebpackPlugin(distFolder, {
        root: resolve(rootFolder),
      }),
    ],
  };
};
