import express from 'express'
import path from 'path'
import compression from 'compression'

const devMiddleware = (app, webpackConfig) => {
  const webpack = require('webpack')
  const webpackDevMiddleware = require('webpack-dev-middleware')
  const webpackHotMiddleware = require('webpack-hot-middleware')
  const compiler = webpack(webpackConfig)

  const middleware = webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath,
    silent: true,
    stats: 'errors-only',
  })

  app.use(middleware)
  app.use(webpackHotMiddleware(compiler))

  const fs = middleware.fileSystem

  app.get('*', (req, res) => {
    fs.readFile(
      path.join(compiler.outputPath, 'index.html'),
      (e, file) => e ? res.sendStatus(404) : res.send(file.toString())
    )
  })
}

const prodMiddleware = (app, options) => {
  const publicPath = options.publicPath || '/'
  const outputPath = options.outputPath || path.resolve(process.cwd(), 'build')

  app.use(compression())
  app.use(publicPath, express.static(outputPath))

  app.get('*', (req, res) => {
    res.sendFile(path.join(outputPath, 'index.html'))
  })
}

export default (app, options) => {
  if (process.env.NODE_ENV === 'production') {
    prodMiddleware(app, options)
  } else {
    const webpackConfig = require('../../webpack/webpack.dev.babel')
    devMiddleware(app, webpackConfig)
  }

  return app
}
