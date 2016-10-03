import c from 'chalk'
import mongoose from 'mongoose'
import registerUser from './User'
import registerEpisode from './Episode'
import log from '../logger'

export default keystone => {
  keystone.set('mongoose', mongoose)
  registerEpisode(keystone)
  registerUser(keystone)
  keystone.set('mongo', 'mongodb://localhost/mwmi')
  keystone.set('session store', 'connect-mongo')
  mongoose.Promise = global.Promise
  mongoose.connection.on('error', log.DBConnectionError())
  mongoose.connection.once('open',  log.DBConnected)
}