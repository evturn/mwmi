import getAppInstance from './cms.mjs';
import { pathTo  } from '../tools/utils.mjs';

getAppInstance(app => {
  app.get('/', (req, res) => res.sendFile(pathTo('build', 'index.html')));
});
