import 'babel-polyfill'
import keystone from 'keystone'
import routes from '../index.js'
import logger from '../logger'

const init = {
  static: '/',
  name: 'Mama We Made It',
  brand: 'MWMI',
  mongo: 'mongodb://localhost/mwmi',
  session: 'mongo',
  auth: true,
  updates: '../updates',
  logger: false,
  port: process.env.PORT_MWMI || 4000,
  env: process.env.NODE_ENV,
  'trust proxy': true,
  'auto update': true,
  'admin path': 'admin',
  'user model': 'User',
  'cookie secret': process.env.MWMI_COOKIE_SECRET,
  'cloudinary config':  process.env.NODE_ENV === 'development'
    ? process.env.CLOUDINARY_URL
    : process.env.MWMI_CLOUDINARY_URL,
}

const nav = {
  episodes: 'episodes',
  users: 'users',
}

keystone.init(init)
keystone.import('../models')
keystone.set('routes', routes)
keystone.set('nav', nav)
keystone.start({
  onHttpServerCreated: err => err
    ? logger.error(err)
    : logger.appStarted(process.env.PORT_MWMI)
})
