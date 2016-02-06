import keystone from 'keystone';

export const loadCurrentPost = (req, res, next) => {
  res.locals.filters = {
    post: req.params.post
  };
  res.locals.section = 'blog';
  const dbQuery = keystone.list('Post')
    .model
    .findOne({
      state: 'published',
      slug: res.locals.filters.post
    })
    .populate('author categories');

  dbQuery.exec((err, result) => {
    res.locals.post = result;
    next();
  });
};

export const loadOtherPosts = (req, res, next) => {
  const dbQuery = keystone.list('Post')
    .model
    .find()
    .where('state', 'published')
    .sort('-publishedDate')
    .populate('author')
    .limit('4');

  dbQuery
    .exec((err, results) => {
      res.locals.posts = results;

      next();
    });
};