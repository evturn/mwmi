import cms from 'keystone';
import { Episode, User } from './models.mjs';
import { pathTo } from '../tools/utils.mjs';

cms.init({
  'admin path': 'admin',
  'cookie secret': 'hereismycookiesecret',
  'session store': 'connect-mongo',
  'trust proxy': true,
  'user model': 'User',
  auth: true,
  env: process.env.NODE_ENV,
  favicon: pathTo('public', 'media', 'favicon.ico'),
  mongo: 'mongodb://localhost/mwmi',
  name: 'MWMI',
  port: process.env.PORT_MWMI || 4000,
  static: pathTo('build'),
});

const api = (req, res, next) => {
  cms.list('Episode')
    .model
    .find()
    .where('state', 'published')
    .sort('-publishedAt')
    .exec((e, episodes) => {
      res.locals.episodes = episodes
      res.json(res.locals)
  });
};

cms.pre('routes', (req, res, next) => {
  res.locals.user = req.user;
  next();
});

const getAppInstance = appHandler => {
  cms.set('routes', app => {
    appHandler(app);
    app.get('/api/episodes', api);
  });
  cms.start();
};

export default getAppInstance;
