import webpack from 'webpack';
import devMiddleware from 'webpack-dev-middleware';
import hotMiddleware from 'webpack-hot-middleware';
import getAppInstance from './cms.mjs';
import config from '../tools/webpack.config.dev.mjs';
import { pathTo  } from '../tools/utils.mjs';

const compiler   = webpack(config);
const middleware = devMiddleware(compiler, {
  logLevel: 'error',
  publicPath: config.output.publicPath,
});

const outputPath = pathTo(compiler.outputPath, 'index.html');
const fs         = middleware.fileSystem;

getAppInstance(app => {
  app.use(middleware);
  app.use(hotMiddleware(compiler));
  app.get('/', (req, res) => res.send(fs.readFileSync(outputPath).toString()));
});
