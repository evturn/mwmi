import keystone from 'keystone'
import express from 'express'
import { locals, episodes, gallery, enquiry, complete } from './middleware'
import webpackDevServer from '../../webpack/dev-server'
import server from '../../../dist/js/ser'

export default app => {
  if (__DEV__) {
    webpackDevServer(app)
  }
  app.use(locals)

  app.get('/api/locals',     episodes, gallery, enquiry.get, complete)
  app.post('/api/contact',   enquiry.post)
  app.get('*', (req, res) => server(req, res))
}