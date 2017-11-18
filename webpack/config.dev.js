const { distFolder } = require('./paths')
const { resolve } = require('path')
const webpackMerge = require('webpack-merge')
const webpack = require('webpack')
const createBaseConfig = require('./config')

module.exports = function createConfig({ distFolder, rootFolder, srcFolder }) {
  return webpackMerge(createBaseConfig.apply(null, arguments), {
    entry: [
      // hot reloading stuff
      'react-hot-loader/patch',
      'webpack-dev-server/client?http://localhost:8080',
      'webpack/hot/only-dev-server',

      // your code
      'index.js'
    ],
    devtool: 'inline-source-map',
    // configure `webpack-dev-server
    devServer: {
      hot: true,
      // where to look for our bundled code
      contentBase: resolve(rootFolder, distFolder),
      // should match output.publicPath
      publicPath: '/',
      // for single page applications we should always serve `index.hml`
      // and let the client routing do the rest
      historyApiFallback: true
    },
    module: {
      rules: [
        // using plain css loader for styles
        {
          test: /\.css$/,
          include: resolve(rootFolder, srcFolder),
          use: ["style-loader", "css-loader"]
        }
      ]
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NamedModulesPlugin()
    ]
  })
}
