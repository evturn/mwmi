import c from 'chalk'

export default {
  error:      err => console.log(c.red(err)),
  appStarted: env => serverListening(env),
}

function serverListening(env) {
  const n = `\n`
  const __ =  `------------------------`
  const _ = __ + __
  const msg = [
    n,
    `${c.gray(_)}`,
    `${c.yellow('Server started 🌐')}`,
    `${c.bold('Running in:')} ${c.magenta(env)}`,
    `${c.gray(_)}`,
    n,
  ].join(n)
  console.log(msg)
}
