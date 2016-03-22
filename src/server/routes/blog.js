import keystone from 'keystone';
import async from 'async';

export const init = (req, res, next) => {
  res.locals.user = req.user;
  res.locals.blog = {
    section: 'blog',
    sort: {
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

export const findOnePost = (req, res, next) => {
  res.locals.section = 'blog';

  const q = keystone.list('Post').model.findOne({
    state: 'published',
    slug: req.params.post
  }).populate('author categories');

  q.exec(function(err, result) {
    res.locals.blog = {
      post: result
    };

    res.json(res.locals);
  });
};

export const populateCategories = (req, res, next) => {
  keystone.list('PostCategory')
    .model.find()
    .sort('name')
    .exec((err, results) => {

    if (err || !results.length) {
      return next(err);
    }

    res.locals.blog = {
      categories: results
    };

    async.each(results, (category, next) => {

      keystone.list('Post')
        .model.count()
        .where('categories')
        .in([category.id])
        .exec((err, count) => {
          category.postCount = count;
          next(err);
        });

    }, err => next(err));
  });
};

export const populateAuthors = (req, res, next) => {
  keystone.list('User')
    .model.find()
    .sort('username')
    .exec((err, results) => {

      if (err || !results.length) {
        return next(err);
      }

      res.locals.blog = res.locals.blog || {};
      res.locals.blog.authors = results;
      next();
    });
};

export const findAllPosts = (req, res, next) => {
  keystone.list('Post')
    .model.find()
    .where('state', 'published')
    .sort('-publishedDate')
    .populate('author categories')
    .exec((err, results) => {
      const pages = Math.ceil(results.length / 2);

      res.locals.blog.sort = {
        all: results
      };
      res.locals.blog.showing = results;
      res.locals.blog.pagination = {
        perPage: 2,
        total: results.length,
        pages,
        buttons: results.map((item, i) => i + 1).filter(i => i <= pages)
      };

      next();
    });
};

export const filterPostsByUsername = (req, res, next) => {
  const allPosts = res.locals.blog.sort.all;
  let allUsers = res.locals.blog.authors;
  let filteredByUsername = {};

  allPosts.map(post => {
    filteredByUsername[post.author.username] = filteredByUsername[post.author.username] || [];
    filteredByUsername[post.author.username].push(post);
  });

  const usersWithPosts = allUsers.filter(user => {
    let hasPosts = false;

    for (let usernameKey in filteredByUsername) {
      if (user.username === usernameKey) {
        hasPosts = true;
      }
    }
    console.log(hasPosts);
    return hasPosts;
  });
  res.locals.blog.sort.author = filteredByUsername;
  res.locals.blog.authors = usersWithPosts;
  next();
};

export const filterPostsByCategory = (req, res, next) => {
  const allPosts = res.locals.blog.sort.all;
  const filteredByCategory = {};

  allPosts.map(post => {
    return post.categories.forEach(category => {
      filteredByCategory[category.key] = filteredByCategory[category.key] || [];
      filteredByCategory[category.key].push(post);
    });
  });

  res.locals.blog.sort.category = filteredByCategory;
  next();
};

export const sendPayload = (req, res, next) => {
  res.json(res.locals);
};