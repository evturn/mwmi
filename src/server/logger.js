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

export default {
  error:       err => console.log(red(err)),
  appStarted: port => console.log(serverListening(port)),
}

function serverListening(port) {
  const divider = `${gray('------------------------------------------------')}`
  return `
${yellow('Server started\n')}
${divider}
${bold('Access URLs:')}
Localhost: ${blue('http://localhost:' + magenta(port))}
      LAN: ${blue('http://' + ip.address() + ':' + magenta(port))}
${divider}
${gray('\nPress' + italic(' CTRL-C ') + 'or' + italic(' CMD-. ') + 'to stop')}
`
}
