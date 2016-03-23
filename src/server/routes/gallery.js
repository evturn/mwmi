import keystone from 'keystone';
import cloudinary from 'cloudinary';

export const get = (req, res, next) => {
  keystone.list('Gallery')
    .model.find().sort('sortOrder')

      console.log(results);
      res.locals.gallery = results;
      res.json(res.locals);
    });
};