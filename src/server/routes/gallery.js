import keystone from 'keystone';
import cloudinary from 'cloudinary';


const CLOUDINARY_HOST = 'http://res.cloudinary.com';


export const get = (req, res, next) => {
  const q = keystone.list('Gallery')
    .model.find()
    .sort('sortOrder')
    .populate('images');

  q.exec((err, data) => {
    res.locals.gallery = data;

    next();
  })
};