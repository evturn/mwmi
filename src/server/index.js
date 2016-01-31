require('babel-core/register');
const server = require('./server');
const home = require('./controllers/home');
const blog = require('./controllers/blog');
const post = require('./controllers/post');
const contact = require('./controllers/contact');


const init = (req, res, next) => {
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

  if (process.env.NODE_ENV === 'development') {
    const webpack = require('webpack');
    const webpackDevMiddleware = require('webpack-dev-middleware');
    const webpackHotMiddleware = require('webpack-hot-middleware');
    const config = require('../../webpack.config');
    const compiler = webpack(config);

    app.use(webpackDevMiddleware(compiler));
    app.use(webpackHotMiddleware(compiler));
  }

  app.use(init);

  app.get('/api/locals', homeSection, send);
  app.get('/api/blog/:category?', blogSection, blog.currentCategoryFilter, blog.loadCategories, blog.loadPosts, send);
  app.get('/api/blog/post/:post', blogSection, post.loadCurrentPost, post.loadOtherPosts, send);
  app.get('/api/contact', contact.get, send);
  app.post('/api/contact', contact.post, send);

  app.get('*', (req, res) => server(req, res));

};