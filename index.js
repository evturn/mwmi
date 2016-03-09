require('babel-register')({
  only: [/server/, /webpack/]
});
require('./src/server/admin');