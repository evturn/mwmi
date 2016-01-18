'use strict';
const babelify = require('babelify');
const browserify = require('browserify-middleware');
const keystone = require('keystone');
const async = require('async');
const importRoutes = keystone.importer(__dirname);

let locals;
exports = module.exports = function(app) {

    const one = function(req, res, next) {
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

  const two = function(req, res, next) {
    keystone.list('PostCategory').model.find().sort('name').exec(function(err, results) {
      if (err || !results.length) {
        return next(err);
      }
      locals.data.categories = results;
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

  const three = function(req, res, next) {
    if (req.params.category) {
      keystone.list('PostCategory').model.findOne({ key: locals.filters.category }).exec(function(err, result) {
        locals.data.category = result;
        next(err);
      });
    } else {
      next();
    }
  };

  const four = function(req, res, next) {
    const q = keystone.list('Post').paginate({
        page: req.query.page || 1,
        perPage: 10,
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
      return res.json(locals);
    });
  };

  app.get('/blogPosts', one, two, three, four);


  app.use('/js', browserify('./client/scripts', {
    transform: [babelify.configure({
      plugins: ['object-assign']
    })]
  }));

  app.use(function(req, res, next) {
    res.render('index');
  });
};
