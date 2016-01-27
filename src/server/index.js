require('babel-core/register');
const server = require('./server');
const middleware = require('./middleware');
const devMiddleware = require('./dev/middleware');
const keystone = require('keystone');
const home = require('./controllers/home');
const blog = require('./controllers/blog');
const post = require('./controllers/post');
const gallery = require('./routes/gallery');
const contact = require('./routes/contact');

const send = (req, res, next) => {
  server(req, res);
};

module.exports = function(app) {
  keystone.pre('routes', middleware.initLocals);
  keystone.pre('routes', middleware.flashMessages);
  devMiddleware(app);

  app.get('/', home, send);
  app.get('/blog/:category?', blog.loadCategories, blog.currentCategoryFilter, blog.loadPosts, send);
  app.get('/blog/post/:post', post.loadCurrentPost, post.loadOtherPosts, send);
  app.get('/gallery', gallery);
  app.get('/contact', contact);

};