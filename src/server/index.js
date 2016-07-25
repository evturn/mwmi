import path from 'path'

import * as middleware from './middlewares/backendMiddleware'
import setup from './middlewares/frontendMiddleware'

export default app => {
  app.get('/mwmi',
    middleware.getUser,
    middleware.getEpisodes
  )

  setup(app, {
    publicPath: path.resolve(process.cwd(), '/'),
    outputPath: path.resolve(process.cwd(), 'build'),
  })
}
