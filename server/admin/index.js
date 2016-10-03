import 'babel-polyfill'
import keystone from 'keystone'
import routes from '../index.js'
import connectToDB from '../models'
import log from '../logger'

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
  'trust proxy': true,
  'admin path': 'admin',
  'user model': 'User',
  port: process.env.PORT_MWMI || 3000,
  env: process.env.NODE_ENV,
  'cookie secret': process.env.MWMI_COOKIE_SECRET,
  'cloudinary config': __DEV__
    ? process.env.CLOUDINARY_URL
    : process.env.MWMI_CLOUDINARY_URL,
}

keystone.init(init)
connectToDB(keystone)
keystone.set('routes', routes)
keystone.set('nav', { episodes: 'episodes', users: 'users' })
keystone.start({
  onHttpServerCreated: err => err
    ? log.serverStartError(err)
    : log.serverStarted(keystone.get('port'), keystone.get('env'))
})
