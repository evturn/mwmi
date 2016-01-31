require('babel-core/register');
const server = require('./server');
const devMiddleware = require('./dev/middleware');
const home = require('./controllers/home');
const blog = require('./controllers/blog');
const post = require('./controllers/post');
const contact = require('./controllers/contact');

const init = (req, res, next) => {
  res.locals.navLinks = [
    { label: 'Home',      key: 'home',      href: '/',        parent: 'home' },
    { label: 'Blog',      key: 'blog',      href: '/blog',    parent: 'blog' },
    { label: 'Gallery',   key: 'gallery',   href: '/gallery', parent: 'gall' },
    { label: 'Contact',   key: 'contact',   href: '/contact', parent: 'cont' }
  ];

  res.locals.user = req.user;
  next();
};

const homeSection = (req, res, next) => {
  res.locals.section = 'home';
  next();
};

const blogSection = (req, res, next) => {
  res.locals.section = 'blog';
  next();
}

const send = (req, res, next) => {
  res.json(res.locals);
};

module.exports = function(app) {
  devMiddleware(app);
  app.use(init);

  app.get('/api/locals', homeSection, send);
  app.get('/api/blog/:category?', blogSection, blog.currentCategoryFilter, blog.loadCategories, blog.loadPosts, send);
  app.get('/api/blog/post/:post', blogSection, post.loadCurrentPost, post.loadOtherPosts, send);
  app.get('/api/contact', contact.get, send);
  app.post('/contact', contact.post, send);

  app.get('*', (req, res) => server(req, res));
};