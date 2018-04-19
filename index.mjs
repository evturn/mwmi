import path from 'path';
import keystone from 'keystone';
import { User } from './admin/models.mjs';

keystone.init({
  'admin path': 'admin',
  'auto update': true,
  'cookie secret': 'hereismycookiesecret',
  'user model': 'User',
  auth: true,
  mongo: 'mongodb://localhost/mwmi',
  name: 'MWMI',
  updates: path.resolve(process.cwd(), 'updates'),
});

const initLocals = (req, res, next) => {
  res.locals.navLinks = [
    { label: 'Home', key: 'home', href: '/' }
  ];
  res.locals.user = req.user;
  next();
}

keystone.pre('routes', initLocals);

keystone.set('routes', app => {
  app.use('/', (req, res, next) => {
    res.send('Sup.');
  });
});

keystone.start();
