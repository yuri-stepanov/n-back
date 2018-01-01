// prod webpack config
const prod = require('./webpack/config.prod')
// dev webpack config
const dev = require('./webpack/config.dev')
const { distFolder, srcFolder } = require('./webpack/paths.js')

// variable that hold value of the environment we are building
// 'prod' or 'dev'
const env = process.env.NODE_ENV

const configFactories = {
  prod,
  dev
}

const configOptions = {
  // folder in which put builded files
  distFolder,
  // main source files folder
  srcFolder,
  // root folder in which build command was called
  rootFolder: __dirname
}

const configFactory = configFactories[env] || prod

module.exports = configFactory(configOptions)
