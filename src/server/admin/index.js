const init = {
  static: '/',
  name: 'Mama We Made It',
  brand: 'MWMI',
  mongo: 'mongodb://localhost/mwmi',
  session: true,
  auth: true,
  updates: './updates',
  port: process.env.PORT_MWMI || 4000,
  env: process.env.NODE_ENV,
  'auto update': true,
  'admin path': 'admin',
  'user model': 'User',
  'cookie secret': process.env.MWMI_COOKIE_SECRET,
  'cloudinary config':  process.env.NODE_ENV === 'development'
    ? process.env.CLOUDINARY_URL
    : process.env.MWMI_CLOUDINARY_URL,
}

const nav = {
  episodes: 'episodes',
  galleries: 'galleries',
  enquiries: 'enquiries',
  users: 'users'
}

export {
  init,
  nav,
}
