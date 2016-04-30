import keystone from 'keystone'
import express from 'express'
import { locals, episodes, gallery, enquiries, complete } from './middleware'
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import webpackConfig from '../../webpack/dev'
import server from '../../../dist/js/ser'

export default function(app) {
  if (process.env.NODE_ENV === 'development') {
    const compiler = webpack(webpackConfig)

    app.use(webpackDevMiddleware(compiler, {
      noInfo: true,
      publicPath: webpackConfig.output.publicPath
    }))

    app.use(webpackHotMiddleware(compiler))
  }

  app.use(locals)

  app.get('/api/locals',          episodes, gallery, complete)
  app.get('/api/contact',         enquiries.get)
  app.post('/api/contact',        enquiries.post)

  app.get('*', (req, res) => server(req, res))
}