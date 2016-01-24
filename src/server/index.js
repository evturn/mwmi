require('babel-core/register');
const server = require('./server');
const middleware = require('./middleware');
const devMiddleware = require('./dev/middleware');
const keystone = require('keystone');
const importRoutes = keystone.importer(__dirname);
const routes = { views: importRoutes('./routes') };
const blog = require('./routes/blog');
const post = require('./routes/post');

module.exports = function(app) {
  keystone.pre('routes', middleware.initLocals);
  keystone.pre('render', middleware.flashMessages);
  devMiddleware(app);

  app.get('/blogPost', blog);

  app.get('*', function(req, res, next) {
    server(req, res);
  });
};