import keystone from 'keystone'
import path from 'path'
import routes from '../routes'

const init = {
  'name': 'Mama We Made It',
  'brand': 'MWMI',
  'env': process.env.NODE_ENV || 'development',
  'static': path.join(__dirname, '..', '..', '..'),
  'favicon': path.join(__dirname, '..', '..', '..', 'dist', 'favicon.png'),
  'mongo': 'mongodb://localhost/mwmi',
  'auto update': true,
  'cloudinary config': process.env.CLOUDINARY_URL,
  'admin path': 'admin',
  'session': true,
  'auth': true,
  'user model': 'User',
  'cookie secret': '939390a671664cf1eca64ee5f4a98b08746c301934cdcbb4c3e49bc18fb3fd88a4580b1e464702b29c0bbde893f9b37e9889002af623d1b6a1df0b960373b03c',
  'updates': '../updates',
  'port': process.env.PORT_MWMI || 4000
}

const locals = {
  _: require('underscore'),
  env: keystone.get('env'),
  utils: keystone.utils,
  editable: keystone.content.editable
}

const nav = {
  'episodes': 'episodes',
  'galleries': 'galleries',
  'enquiries': 'enquiries',
  'users': 'users'
}

keystone.init(init)
keystone.import('../models')
keystone.set('locals', locals)
keystone.set('routes', routes)
keystone.set('nav', nav)
keystone.start(_ => console.log(process.env.NODE_ENV))