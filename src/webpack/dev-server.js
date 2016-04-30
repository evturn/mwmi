import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import webpackConfig from './dev'

const compiler = webpack(webpackConfig)
const devMiddleware = webpackDevMiddleware(compiler, {
  noInfo: true,
  publicPath: webpackConfig.output.publicPath
})
const hotMiddleware = webpackHotMiddleware(compiler)

export default app => {
  app.use(devMiddleware)
  app.use(hotMiddleware)

  return app
}