const keystone = require('keystone');
const async = require('async');

let locals;
export const init = (req, res, next) => {

  locals = res.locals;

  locals.section = 'blog';
  locals.filters = {
    category: req.params.category
  };
  locals.data = {
    posts: [],
    categories: []
  };

  next();
};


export const categories = (req, res, next) => {

  keystone.list('PostCategory').model.find().sort('name').exec(function(err, results) {

    if (err || !results.length) {
      return next(err);
    }

    locals.data.categories = results;

    // Load the counts for each category
    async.each(locals.data.categories, function(category, next) {

      keystone.list('Post').model.count().where('categories').in([category.id]).exec(function(err, count) {
        category.postCount = count;
        next(err);
      });

    }, function(err) {
      next(err);
    });

  });

};

  // Load the current category filter
export const filters = (req, res, next) => {
  if (req.params.category) {
    keystone.list('PostCategory').model.findOne({ key: locals.filters.category }).exec(function(err, result) {
      locals.data.category = result;
      next(err);
    });
  } else {
    next();
  }

};

  // Load the posts
export const posts = (req, res, next) => {

  const q = keystone.list('Post').paginate({
      page: req.query.page || 1,
      perPage: 2,
      maxPages: 10
    })
    .where('state', 'published')
    .sort('-publishedDate')
    .populate('author categories');

  if (locals.data.category) {
    q.where('categories').in([locals.data.category]);
  }

  q.exec(function(err, results) {
    locals.data.posts = results;
    res.json(locals);
  });
};