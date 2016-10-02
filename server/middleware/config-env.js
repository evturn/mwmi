import express from 'express'
import fs from 'fs'
import path from 'path'
import compression from 'compression'
import webpack from 'webpack'
import webpackHotMiddleware from 'webpack-hot-middleware'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackConfig from '../../config/webpack/webpack.dev.babel.js'

export default app => {
  if (process.env.NODE_ENV === 'development') {
    return devMiddleware(app)
  } else {
    return prodMiddleware(app)
  }
}

function devMiddleware(app) {
  const compiler = webpack(webpackConfig)
  const middleware = webpackDevMiddleware(compiler, {
    noInfo: true,
    silent: true,
    publicPath: '/',
    stats: 'errors-only',
  })

  app.use(middleware)
  app.use(webpackHotMiddleware(compiler))
  app.use(express.static(path.join(process.cwd(), '/')))


  const file = fs.readFileSync(path.join(process.cwd(), 'build', 'index.html'))
  return (req, res, next) => res.send(file.toString())
}

function prodMiddleware(app) {
  const publicPath = '/'
  const outputPath = path.resolve(process.cwd(), 'build')

  app.use(compression())
  app.use(publicPath, express.static(outputPath))

  return (req, res, next) => res.sendFile(path.resolve(outputPath, 'index.html'))
}