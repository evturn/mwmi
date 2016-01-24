'use strict';
const keystone = require('keystone');
const async = require('async');

exports.loadCategories = function loadCategories(req, res, next) {
  keystone.list('PostCategory')
    .model
    .find()
    .sort('name')
    .exec((err, results) => {
      if (err || !results.length) { console.log(err); }

      res.locals.data = {
        categories: results
      };
      async.each(res.locals.data.categories, (category, next) => {
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

exports.currentCategoryFilter = function currentCategoryFilter(req, res, next) {
  if (req.params.category) {
    keystone.list('PostCategory')
      .model
      .findOne({ key: res.locals.filters.category })
      .exec((err, result) => {
        if (err) { console.log(err); }

        res.locals.data = {
          category: result
        };
        next();
      });
  } else {
    res.locals.data = {
      category: null
    };
    next();
  }
};

exports.loadPosts = function loadPosts(req, res, next) {
  const dbQuery = keystone.list('Post')
    .paginate({
      page: req.query.page || 1,
      perPage: 10,
      maxPages: 10
    })
    .where('state', 'published')
    .sort('-publishedDate')
    .populate('author categories');

  if (res.locals.data.category) {
    dbQuery
      .where('categories')
      .in([res.locals.data.category]);
  }

  dbQuery
    .exec((err, results) => {
      res.locals.data.posts = results;

      next();
    });
};

exports.send = function send(req, res, next) {
  res.json(res.locals);
};