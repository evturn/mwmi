require('babel-core/register');
const server = require('./server');
const middleware = require('./middleware');
const devMiddleware = require('./dev/middleware');
const keystone = require('keystone');
const index = require('./routes/index');
const blog = require('./routes/blog');
const post = require('./routes/post');
const gallery = require('./routes/gallery');
const contact = require('./routes/contact');

module.exports = function(app) {
  keystone.pre('routes', middleware.initLocals);
  keystone.pre('render', middleware.flashMessages);
  devMiddleware(app);

  app.get('/api', index);
  app.get('/api/blog/:category?', blog);
  app.get('/api/blog/post/:post', post);
  app.get('/api/gallery', gallery);
  app.all('/api/contact', contact);

  app.get('*', function(req, res, next) {
    server(req, res);
  });
};