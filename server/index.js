import path from 'path'
import initLocals from './middleware'
import configEnv from './middleware/config-env'

export default app => {
  const sendFile = configEnv(app)

  app.get('/mwmi', initLocals())
  app.get('*', sendFile)
}
