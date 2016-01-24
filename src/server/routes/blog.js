'use strict';
var keystone = require('keystone');
var async = require('async');

module.exports = function(req, res, next) {
  var locals = res.locals;
  locals.section = 'blog';
  locals.filters = {
    category: req.params.category
  };
  locals.data = {
    posts: [],
    categories: []
  };

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
      keystone.list('PostCategory').model.findOne({ key: locals.filters.category }).exec(function(err, result) {
        locals.data.category = result;
        var q = keystone.list('Post').paginate({
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

          next();
        });
      });
    });
  });
};