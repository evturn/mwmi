import keystone from 'keystone';
import async from 'async';

export const loadCategories = (req, res, next) => {
  keystone.list('PostCategory')
    .model
    .find()
    .sort('name')
    .exec((err, results) => {
      if (err || !results.length) { console.log(err); }

      res.locals.categories = results;

      async.each(res.locals.categories, (category, next) => {
        keystone.list('Post')
          .model
          .count()
          .where('categories')
          .in([category.id])
          .exec((err, count) => {
            if (err) { console.log(err); }
            category.postCount = count;
            next();
          });
      }, () => next());
    });
};

export const currentCategoryFilter = (req, res, next) => {
  if (req.params.category) {
    res.locals.filters = {
      category: req.params.category
    };

    keystone.list('PostCategory')
      .model
      .findOne({ key: res.locals.filters.category })
      .exec((err, result) => {
        if (err) { console.log(err); }

        res.locals.category = result;
        next();
      });
  } else {
    res.locals.category = null;
    next();
  }
};

export const loadPosts = (req, res, next) => {
  const dbQuery = keystone.list('Post')
    .paginate({
      page: req.query.page || 1,
      perPage: 2,
      maxPages: 10
    })
    .where('state', 'published')
    .sort('-publishedDate')
    .populate('author categories');

  if (res.locals.category) {
    dbQuery
      .where('categories')
      .in([res.locals.category]);
  }

  dbQuery
    .exec((err, results) => {
      res.locals.posts = results;

      next();
    });
};