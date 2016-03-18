import keystone from 'keystone';
import async from 'async';

export const init = (req, res, next) => {

  res.locals.blog = {
    section: 'blog',
    filters: {
      category: req.params.category
    },
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
    data: {
      posts: [],
      categories: []
    }
  };

  next();

};

export const categories = (req, res, next) => {

  keystone.list('PostCategory')
    .model.find()
    .sort('name')
    .exec((err, results) => {

    if (err || !results.length) {
      return next(err);
    }

    res.locals.blog.data.categories = results;

    async.each(res.locals.blog.data.categories, (category, next) => {

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

export const filters = (req, res, next) => {

  if (req.params.category) {
    keystone.list('PostCategory')
      .model.findOne({ key: res.locals.blog.filters.category })
      .exec((err, result) => {
        res.locals.blog.data.category = result;
        next(err);
      });
  } else {
    next();
  }

};

export const posts = (req, res, next) => {
  keystone.list('Post')
    .model
    .find()
    .where('state', 'published')
    .sort('-publishedDate')
    .populate('author categories')
    .exec((err, results) => {
      res.locals.blog.data.posts = {
        first: 1,
        last: 1,
        pages: [1],
        totalPages: 1,
        currentPage: 1,
        previous: false,
        next: false,
        total: results.length,
        results
      };
      const pages = Math.ceil(results.length / 2);

      res.locals.blog.sort = {
        all: results,
        category: sortPostsByCategory(results),
        author: sortPostsByAuthor(results)
      };
      res.locals.blog.showing = res.locals.blog.sort.all;
      res.locals.blog.pagination = {
        perPage: 2,
        total: results.length,
        pages,
        buttons: results.map((item, i) => i + 1).filter(i => i <= pages)
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

export const postsWithPaginate = (req, res, next) => {

  const q = keystone.list('Post').paginate({
      page: req.query.page || 1,
      perPage: 2,
      maxPages: 10
    })
    .where('state', 'published')
    .sort('-publishedDate')
    .populate('author categories');

  if (res.locals.blog.data.category) {
    q.where('categories').in([res.locals.blog.data.category]);
  }

  q.exec((err, results) => {
    res.locals.blog.data.posts = results;
    res.json(locals);
  });

};