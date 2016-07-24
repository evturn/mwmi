import chalk from 'chalk'
import ip from 'ip'

const {
  red,
  blue,
  yellow,
  magenta,
  gray,
  bold,
  italic,
} = chalk
const divider = `${gray('------------------------------------------------')}`
const localhost = `http://localhost:${magenta(process.env.PORT)}`
const lan = `http://${ip.address()}:${magenta(process.env.PORT)}`

export default {
  error:    err => console.log(red(err)),
  appStarted: _ => console.log(serverListening()),
}

function serverListening() {
  return `
${yellow('Server started\n')}
${divider}
${bold('Access URLs:')}
Localhost: ${blue(localhost)}
      LAN: ${blue(lan)}
${divider}
${gray('\nPress' + italic(' CTRL-C ') + 'or' + italic(' CMD-. ') + 'to stop')}
`
}
