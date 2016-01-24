'use strict';
const babelify = require('babelify');
const browserify = require('browserify-middleware');
const middleware = require('./middleware');
const keystone = require('keystone');
const importRoutes = keystone.importer(__dirname);
const routes = { views: importRoutes('./views') };

exports = module.exports = function(app) {
keystone.pre('routes', middleware.initLocals);
keystone.pre('render', middleware.flashMessages);

app.use('/js', browserify('./client/server.js', {
  transform: [babelify.configure({
    plugins: ['object-assign']
  })]
}));

app.get('/', routes.views.index);
app.get('/blog/:category?', routes.views.blog);
app.get('/blog/post/:post', routes.views.post);
app.get('/gallery', routes.views.gallery);
app.all('/contact', routes.views.contact);

  // NOTE: To protect a route so that only admins can see it, use the requireUser middleware:
  // app.get('/protected', middleware.requireUser, routes.views.protected);
};