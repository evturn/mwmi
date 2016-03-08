import keystone from 'keystone';
import path from 'path';

const init = {
  'name': 'mwmi',
  'brand': 'mwmi',
  'static': path.join(__dirname, '..', '..', '..'),
  'favicon': 'public/img/favicon.png',
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
  'updates': path.join(__dirname, '..', 'updates')
};

const locals = {
  _: require('underscore'),
  env: keystone.get('env'),
  utils: keystone.utils,
  editable: keystone.content.editable
};

const nav = {
  'posts': ['posts', 'post-categories'],
  'galleries': 'galleries',
  'enquiries': 'enquiries',
  'users': 'users'
};

keystone.init(init);
keystone.import('../models');
keystone.set('locals', locals);
keystone.set('routes', require('../routes'));
keystone.set('nav', nav);
keystone.start();