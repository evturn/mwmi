import chalk from 'chalk'
import ip from 'ip'

const divider = `${chalk.gray('------------------------------------------------')}`

export default {
  error:       err => console.log(chalk.red(err)),
  appStarted: port => console.log(serverListening(port)),
}

function serverListening(port) {
  return `
${chalk.yellow('Server started\n')}
${divider}
${chalk.bold('Access URLs:')}
Localhost: ${chalk.blue('http://localhost:' + chalk.magenta(port))}
      LAN: ${chalk.blue('http://' + ip.address() + ':' + chalk.magenta(port))}
${divider}
${chalk.gray('\nPress' + chalk.italic(' CTRL-C ') + 'or' + chalk.italic(' CMD-. ') + 'to stop')}
`
}
