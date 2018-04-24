import cms from 'keystone';
import { Episode, User } from './models.mjs';
import { pathTo } from '../tools/utils.mjs';

cms.init({
  'admin path': 'admin',
  'cookie secret': 'hereismycookiesecret',
  'user model': 'User',
  auth: true,
  env: process.env.NODE_ENV,
  mongo: 'mongodb://localhost/mwmi',
  name: 'MWMI',
  port: process.env.PORT_MWMI || 4000,
  static: pathTo('build'),
});

const api = (req, res, next) => {
  cms.list('Episode')
    .model.find()
    .where('state', 'published')
    .sort('-publishedAt')
    .exec((err, episodes) => {
      res.locals.episodes = episodes
      res.json(res.locals)
  });
};

const getAppInstance = appHandler => {
  cms.set('routes', app => {
    appHandler(app);
    app.get('/api/episodes', api);
  });
  cms.start();
};

export default getAppInstance;
