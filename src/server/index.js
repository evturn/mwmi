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
  // keystone.pre('routes', middleware.flashMessages);
  keystone.pre('routes', blog.loadCategories);
  keystone.pre('routes', blog.currentCategoryFilter);
  keystone.pre('routes', blog.loadPosts);
  devMiddleware(app);

  app.get('/', home, send);
  app.get('/blog/:category?', blog.setSection, send);
  app.get('/blog/post/:post', blog.setSection, post.loadCurrentPost, post.loadOtherPosts, send);
  app.get('/gallery', gallery);
  app.get('/contact', contact);

};