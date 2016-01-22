// Webpack dev server
// Ran in parallel with the Express server

import WebpackDevServer from "webpack-dev-server";
import webpack from "webpack";
import config from "../../webpack.config";
import path from 'path';

var server = new WebpackDevServer(webpack(config), {
  // webpack-dev-server options
  outputPath: 'dist',
  publicPath: config.output.publicPath,
  hot: true,
  inline: true,
  progress: true,
  stats: { colors: true },
});
server.listen(8080, "localhost", function() {});
