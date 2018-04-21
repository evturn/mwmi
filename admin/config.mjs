const adminConfig = {
  'admin path': 'admin',
  'cookie secret': 'hereismycookiesecret',
  'user model': 'User',
  auth: true,
  mongo: 'mongodb://localhost/mwmi',
  port: process.env.PORT_MWMI || 4000,
  name: 'MWMI',
};

export default adminConfig;
