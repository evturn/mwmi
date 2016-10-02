import 'babel-polyfill'
import keystone from 'keystone'
import routes from '../index.js'
import connectToDB from '../models'
import logger from '../logger'

const __DEV__ = process.env.NODE_ENV === 'development'

const init = {
  static: '/',
  name: 'Mama We Made It',
  brand: 'MWMI',
  auth: true,
  updates: '../updates',
  compress: __DEV__ ? false : true,
  'auto update': __DEV__ ? true : false,
  logger: false,
  port: process.env.PORT_MWMI || 4000,
  env: process.env.NODE_ENV,
  'trust proxy': true,
  'admin path': 'admin',
  'user model': 'User',
  'cookie secret': process.env.MWMI_COOKIE_SECRET,
  'cloudinary config': __DEV__
    ? process.env.CLOUDINARY_URL
    : process.env.MWMI_CLOUDINARY_URL,
}

const nav = {
  episodes: 'episodes',
  users: 'users',
}

keystone.init(init)
connectToDB(keystone)
keystone.set('routes', routes)
keystone.set('nav', nav)
keystone.start({
  onHttpServerCreated: err => err
    ? logger.error(err)
    : logger.appStarted(process.env.NODE_ENV)
})
