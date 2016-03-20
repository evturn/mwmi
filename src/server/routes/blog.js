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
    categories: [],
    posts: [],
    post: {}
  };

  next();
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

export const findAllPosts = (req, res, next) => {
  keystone.list('Post')
    .model.find()
    .where('state', 'published')
    .sort('-publishedDate')
    .populate('author categories')
    .exec((err, results) => {
      const pages = Math.ceil(results.length / 2);

      res.locals.blog = {
        categories: res.locals.blog.categories,
        posts: results,
        sort: {
          all: results,
          category: sortPostsByCategory(results),
          author: sortPostsByAuthor(results)
        },
        showing: results,
        pagination: {
          perPage: 2,
          total: results.length,
          pages,
          buttons: results.map((item, i) => i + 1).filter(i => i <= pages)
        }
      };

      res.json(res.locals);
    });
};

function sortPostsByAuthor(posts) {

  const sortedByAuthor = {};

  posts.map(post => {
    sortedByAuthor[post.author.name.first] = sortedByAuthor[post.author.name.first] || [];
    sortedByAuthor[post.author.name.first].push(post);
  });

  return sortedByAuthor;
};

function sortPostsByCategory(posts) {

  const sortedByCategory = {};

  posts.map(post => {
    return post.categories.forEach(category => {
      sortedByCategory[category.key] = sortedByCategory[category.key] || [];
      sortedByCategory[category.key].push(post);
    });
  });

  return sortedByCategory;
};