'use strict';
const keystone = require('keystone');

exports.loadCurrentPost = function(req, res, next) {
  res.locals.filters.post = req.params.post;
  res.locals.section = 'blog';
  const dbQuery = keystone.list('Post')
    .model
    .findOne({
      state: 'published',
      slug: res.locals.filters.post
    })
    .populate('author categories');

  dbQuery.exec((err, result) => {
    res.locals.data = {
      post: result
    };

    next();
  });
};

exports.loadOtherPosts = function(req, res, next) {
  const dbQuery = keystone.list('Post')
    .model
    .find()
    .where('state', 'published')
    .sort('-publishedDate')
    .populate('author')
    .limit('4');

  dbQuery
    .exec((err, results) => {
      res.locals.data.posts = results;

      next();
    });
};

exports.send = function(req, res, next) {
  res.json(res.locals);
};