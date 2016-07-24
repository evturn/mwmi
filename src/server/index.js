import express from 'express'
import keystone from 'keystone'
import logger from './logger'
import frontend from './middlewares/frontendMiddleware'
import * as middleware from './middlewares/backendMiddleware'
import * as admin from './admin'

const app = express()

const webpackConfig = process.env.NODE_ENV !== 'production'
  ? require('../webpack/webpack.dev.babel')
  : require('../webpack/webpack.prod.babel')

app.use(middleware.getUser)

app.get('/api/locals', middleware.getEpisodes)

app.use(frontend(webpackConfig))

keystone.init(admin.init)
keystone.import('./models')
keystone.set('app', app)
keystone.set('nav', admin.nav)
keystone.start({
  onHttpServerCreated: e => {
    if (e) {
      return logger.error(e)
    }

    logger.appStarted(process.env.PORT_MWMI)
  }
})
