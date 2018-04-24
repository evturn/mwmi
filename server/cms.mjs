import cms from 'keystone';
import { User } from './models.mjs';
import { pathTo } from '../tools/utils.mjs';

cms.init({
  'admin path': 'admin',
  'cookie secret': 'hereismycookiesecret',
  'user model': 'User',
  auth: true,
  mongo: 'mongodb://localhost/mwmi',
  name: 'MWMI',
  port: process.env.PORT_MWMI || 4000,
  static: pathTo('build'),
});

const getAppInstance = appHandler => {
  cms.set('routes', appHandler);
  cms.start();
};

export default getAppInstance;
