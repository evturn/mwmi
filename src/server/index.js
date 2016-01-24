require('babel-core/register');
const server = require('./server');
const middleware = require('./middleware');
const keystone = require('keystone');
const importRoutes = keystone.importer(__dirname);
const routes = { views: importRoutes('./routes') };

module.exports = function(app) {
  keystone.pre('routes', middleware.initLocals);
  keystone.pre('render', middleware.flashMessages);

  server(app);
};