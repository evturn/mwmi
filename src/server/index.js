import frontend from './middlewares/frontendMiddleware'
import * as middleware from './middlewares/backendMiddleware'

const webpackConfig = process.env.NODE_ENV !== 'production'
  ? require('../webpack/webpack.dev.babel')
  : require('../webpack/webpack.prod.babel')

export default app => {
  app.get('/api/locals',
    middleware.getUser,
    middleware.getEpisodes
  )

  app.use(frontend(webpackConfig))
}
