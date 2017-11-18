const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const { resolve } = require('path')
const createBaseConfig = require('./config')
const ExtractTextPlugin = require("extract-text-webpack-plugin")

module.exports = function createConfig({ rootFolder, srcFolder }) {
  return webpackMerge(createBaseConfig.apply(null, arguments), {
    // for production config we use only our code as entry point
    entry: './index.js',
    devtool: 'hidden-source-map',
    module: {
      rules: [
        // using plain css loader for styles
        {
          test: /\.css$/,
          include: resolve(rootFolder, srcFolder),
          use: ExtractTextPlugin.extract({
            fallback: "style-loader",
            use: "css-loader"
          })
        }
      ]
    },
    plugins: [
      // we will not emit code in case of build step failed
      new webpack.NoEmitOnErrorsPlugin(),
      new ExtractTextPlugin("styles.css"),
      // turing production mode `On` in react
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('production')
        }
      }),
      // minimize our code
      new webpack.optimize.UglifyJsPlugin({ sourceMap: true })
    ]
  })
}
