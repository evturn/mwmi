'use strict';
const keystone = require('keystone');

keystone.init({

  'name': 'mwmi',
  'brand': 'mwmi',

  'static': './src/assets',
  'favicon': 'assets/images/logo.png',
  'mongo': 'mongodb://localhost/mwmi',

  'auto update': true,
  'session': true,
  'auth': true,
  'user model': 'User',
  'cookie secret': '939390a671664cf1eca64ee5f4a98b08746c301934cdcbb4c3e49bc18fb3fd88a4580b1e464702b29c0bbde893f9b37e9889002af623d1b6a1df0b960373b03c',

});

keystone.import('./src/server/models');

keystone.set('cloudinary config', process.env.CLOUDINARY_URL);
keystone.set('mandrill api key', process.env.MANDRILL_API_KEY);
keystone.set('mandrill username', process.env.MANDRILL_USERNAME);

keystone.set('locals', {
  _: require('underscore'),
  env: keystone.get('env'),
  utils: keystone.utils,
  editable: keystone.content.editable
});

keystone.set('routes', require('./src/server'));

keystone.set('nav', {
  'posts': ['posts', 'post-categories'],
  'galleries': 'galleries',
  'enquiries': 'enquiries',
  'users': 'users'
});

keystone.start();