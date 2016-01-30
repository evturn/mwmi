require('babel-core/register');
const server = require('./server');
const devMiddleware = require('./dev/middleware');
const home = require('./controllers/home');
const blog = require('./controllers/blog');
const post = require('./controllers/post');

const init = (req, res, next) => {
  res.locals.navLinks = [
    { label: 'Home',      key: 'home',      href: '/' },
    { label: 'Blog',      key: 'blog',      href: '/blog' },
    { label: 'Gallery',   key: 'gallery',   href: '/gallery' },
    { label: 'Contact',   key: 'contact',   href: '/contact' }
  ];

  res.locals.user = req.user;
  next();
};

const send = (req, res, next) => {
  res.json(res.locals);
};

module.exports = function(app) {
  devMiddleware(app);
  app.use(init);

  app.get('/api/locals', send);
  app.get('/api/blog/:category?', blog.setSection, blog.currentCategoryFilter, blog.loadCategories, blog.loadPosts, blog.send);
  app.get('/api/blog/post/:post', blog.setSection, post.loadCurrentPost, post.loadOtherPosts, send);

  app.get('*', (req, res) => server(req, res));
};