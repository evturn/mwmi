import keystone from 'keystone'
import path from 'path'
import routes from '../routes'

global.__DEV__ = process.env.NODE_ENV === 'development'

const init = {
  'name': 'Mama We Made It',
  'brand': 'MWMI',
  'env': process.env.NODE_ENV,
  'static': path.join(__dirname, '..', '..', '..'),
  'favicon': path.join(__dirname, '..', '..', '..', 'dist', 'favicon.png'),
  'mongo': 'mongodb://localhost/mwmi',
  'auto update': true,
  'cloudinary config':  __DEV__ ? process.env.CLOUDINARY_URL : process.env.MWMI_CLOUDINARY_URL,
  'admin path': 'admin',
  'session': true,
  'auth': true,
  'user model': 'User',
  'cookie secret': process.env.MWMI_COOKIE_SECRET,
  'updates': '../updates',
  'port': process.env.PORT_MWMI || 4000
}

const nav = {
  'episodes': 'episodes',
  'galleries': 'galleries',
  'enquiries': 'enquiries',
  'users': 'users'
}

keystone.init(init)
keystone.import('../models')
keystone.set('routes', routes)
keystone.set('nav', nav)
keystone.start()