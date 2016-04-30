'use strict';

var _keystone = require('keystone');

var _keystone2 = _interopRequireDefault(_keystone);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _routes = require('../routes');

var _routes2 = _interopRequireDefault(_routes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var init = {
  'name': 'mwmi',
  'brand': 'mwmi',
  'env': process.env.NODE_ENV || 'development',
  'static': _path2.default.join(__dirname, '..', '..', '..'),
  'favicon': _path2.default.join(__dirname, '..', '..', '..', 'dist', 'favicon.png'),
  'mongo': 'mongodb://localhost/mwmi',
  'auto update': true,
  'cloudinary config': process.env.CLOUDINARY_URL,
  'mandrill api key': process.env.MANDRILL_API_KEY,
  'mandrill username': process.env.MANDRILL_USERNAME,
  'admin path': 'admin',
  'session': true,
  'auth': true,
  'user model': 'User',
  'cookie secret': '939390a671664cf1eca64ee5f4a98b08746c301934cdcbb4c3e49bc18fb3fd88a4580b1e464702b29c0bbde893f9b37e9889002af623d1b6a1df0b960373b03c',
  'updates': '../updates'
};

var locals = {
  _: require('underscore'),
  env: _keystone2.default.get('env'),
  utils: _keystone2.default.utils,
  editable: _keystone2.default.content.editable
};

var nav = {
  'episodes': 'episodes',
  'galleries': 'galleries',
  'enquiries': 'enquiries',
  'users': 'users'
};

_keystone2.default.init(init);
_keystone2.default.import('../models');
_keystone2.default.set('locals', locals);
_keystone2.default.set('routes', _routes2.default);
_keystone2.default.set('nav', nav);
_keystone2.default.start();