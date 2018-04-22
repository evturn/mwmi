import cms from 'keystone';
import cmsConfig from '../admin/config.mjs';
import { User } from '../admin/models.mjs';

cms.init(cmsConfig);

const getAppInstance = appHandler => {
  cms.set('routes', appHandler);
  cms.start();
};

export default getAppInstance;
