'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (app) {
  if (process.env.NODE_ENV === 'development') {
    console.log(process.env.NODE_ENV, 'inside');
    var compiler = (0, _webpack2.default)(_dev2.default);

    app.use((0, _webpackDevMiddleware2.default)(compiler, {
      noInfo: true,
      publicPath: _dev2.default.output.publicPath
    }));

    app.use((0, _webpackHotMiddleware2.default)(compiler));
  }

  app.use(locals);

  app.get('/api/locals', episode.get, gallery.get, episode.send);
  app.get('/api/contact', enquiry.get);
  app.post('/api/contact', enquiry.post);
  app.get('/api/gallery', gallery.get);

  app.get('*', function (req, res) {
    return (0, _ser2.default)(req, res);
  });
};

var _keystone = require('keystone');

var _keystone2 = _interopRequireDefault(_keystone);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _episode = require('./episode');

var episode = _interopRequireWildcard(_episode);

var _enquiry = require('./enquiry');

var enquiry = _interopRequireWildcard(_enquiry);

var _gallery = require('./gallery');

var gallery = _interopRequireWildcard(_gallery);

var _webpack = require('webpack');

var _webpack2 = _interopRequireDefault(_webpack);

var _webpackDevMiddleware = require('webpack-dev-middleware');

var _webpackDevMiddleware2 = _interopRequireDefault(_webpackDevMiddleware);

var _webpackHotMiddleware = require('webpack-hot-middleware');

var _webpackHotMiddleware2 = _interopRequireDefault(_webpackHotMiddleware);

var _dev = require('../../webpack/dev');

var _dev2 = _interopRequireDefault(_dev);

var _ser = require('../../../dist/js/ser');

var _ser2 = _interopRequireDefault(_ser);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var locals = function locals(req, res, next) {
  res.locals.user = req.user;
  res.locals.nav = [{ name: 'Home', key: 'home', href: '/' }, { name: 'Gallery', key: 'gallery', href: '/gallery' }, { name: 'About', key: 'about', href: '/about' }];

  next();
};

console.log(process.env.NODE_ENV, 'outside');
module.exports = exports['default'];