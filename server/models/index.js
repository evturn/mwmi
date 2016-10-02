import c from 'chalk'
import mongoose from 'mongoose'
import registerUser from './User'
import registerEpisode from './Episode'

export default keystone => {
  keystone.set('mongoose', mongoose)
  registerEpisode(keystone)
  registerUser(keystone)
  keystone.set('mongo', 'mongodb://localhost/mwmi')
  keystone.set('session store', 'connect-mongo')
  mongoose.Promise = global.Promise
  mongoose.connection.on('error', DBConnectionError())
  mongoose.connection.once('open',  DBConnected)
}

function DBConnected() {
  const n = `\n`
  const msg = [
    n,
    `${c.green('DB connected 🖖🏽')}`,
    n
  ].join(n)
  console.log(msg)
}

function DBConnectionError() {
  const n = `n`
  const msg = [
  n,
  `${c.bgRed.white('Connection error:')}`,
  n
  ].join(n)

  return console.error.bind(console, msg)
}



