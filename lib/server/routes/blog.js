'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sendPayload = exports.filterPostsByCategory = exports.filterPostsByUsername = exports.findAllPosts = exports.populateAuthors = exports.populateCategories = exports.findOnePost = exports.init = undefined;

var _keystone = require('keystone');

var _keystone2 = _interopRequireDefault(_keystone);

var _async = require('async');

var _async2 = _interopRequireDefault(_async);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var init = exports.init = function init(req, res, next) {
  res.locals.user = req.user;
  res.locals.blog = {
    section: 'blog',
    filter: {
      all: [],
      category: {},
      author: {}
    },
    pagination: {
      perPage: 2,
      pages: 0,
      total: 0
    },
    authors: [],
    categories: [],
    posts: [],
    post: {}
  };

  next();
};

var findOnePost = exports.findOnePost = function findOnePost(req, res, next) {
  res.locals.section = 'blog';

  var q = _keystone2.default.list('Post').model.findOne({
    state: 'published',
    slug: req.params.post
  }).populate('author categories');

  q.exec(function (err, result) {
    res.locals.blog = {
      post: result
    };

    res.json(res.locals);
  });
};

var populateCategories = exports.populateCategories = function populateCategories(req, res, next) {
  _keystone2.default.list('PostCategory').model.find().sort('name').exec(function (err, results) {

    if (err || !results.length) {
      return next(err);
    }

    res.locals.blog = {
      categories: results
    };

    _async2.default.each(results, function (category, next) {

      _keystone2.default.list('Post').model.count().where('categories').in([category.id]).exec(function (err, count) {
        category.postCount = count;
        next(err);
      });
    }, function (err) {
      return next(err);
    });
  });
};

var populateAuthors = exports.populateAuthors = function populateAuthors(req, res, next) {
  _keystone2.default.list('User').model.find().sort('username').exec(function (err, results) {

    if (err || !results.length) {
      return next(err);
    }

    res.locals.blog = res.locals.blog || {};
    res.locals.blog.authors = results;
    next();
  });
};

var findAllPosts = exports.findAllPosts = function findAllPosts(req, res, next) {
  _keystone2.default.list('Post').model.find().where('state', 'published').sort('-publishedDate').populate('author categories').exec(function (err, results) {
    var pages = Math.ceil(results.length / 2);

    res.locals.blog.filter = {
      all: results
    };
    res.locals.blog.showing = results;
    res.locals.blog.pagination = {
      perPage: 2,
      total: results.length,
      pages: pages,
      buttons: results.map(function (item, i) {
        return i + 1;
      }).filter(function (i) {
        return i <= pages;
      })
    };

    next();
  });
};

var filterPostsByUsername = exports.filterPostsByUsername = function filterPostsByUsername(req, res, next) {
  var allPosts = res.locals.blog.filter.all;
  var allUsers = res.locals.blog.authors;
  var filteredByUsername = {};

  allPosts.map(function (post) {
    filteredByUsername[post.author.username] = filteredByUsername[post.author.username] || [];
    filteredByUsername[post.author.username].push(post);
  });

  var usersWithPosts = allUsers.filter(function (user) {
    var hasPosts = false;

    for (var usernameKey in filteredByUsername) {
      if (user.username === usernameKey) {
        hasPosts = true;
      }
    }

    return hasPosts;
  });

  res.locals.blog.filter.author = filteredByUsername;
  res.locals.blog.authors = usersWithPosts;
  next();
};

var filterPostsByCategory = exports.filterPostsByCategory = function filterPostsByCategory(req, res, next) {
  var allPosts = res.locals.blog.filter.all;
  var filteredByCategory = {};

  allPosts.map(function (post) {
    return post.categories.forEach(function (category) {
      filteredByCategory[category.key] = filteredByCategory[category.key] || [];
      filteredByCategory[category.key].push(post);
    });
  });

  res.locals.blog.filter.category = filteredByCategory;
  next();
};

var sendPayload = exports.sendPayload = function sendPayload(req, res, next) {
  res.json(res.locals);
};