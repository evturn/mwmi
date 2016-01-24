'use strict';
const keystone = require('keystone');
const async = require('async');

module.exports = class BlogController {
  constructor(req, res) {
    this.locals = res.locals;
    this.params = req.params;
    this.query = req.query;
    this.locals.section = 'blog';
    this.locals.filters = {
      category: req.params.category
    };
    this.locals.data = {
      posts: [],
      categories: []
    };
    const categories = this.loadCategories();
    const filter = this.currentCategoryFilter();
    const posts = this.loadPosts();
    Promise.all([categories, filter, posts])
      .then(values => {
        const [categories, filter, posts] = values;
        const data = {categories, filter, posts};

        res.json(data);
    });
  }
  loadCategories() {
    return new Promise((resolve, reject) => {
      keystone.list('PostCategory')
        .model
        .find()
        .sort('name')
        .exec((err, results) => {
          if (err || !results.length) { console.log(err); }

          this.locals.data.categories = results;
          async.each(this.locals.data.categories, (category, next) => {
            keystone.list('Post')
              .model
              .count()
              .where('categories')
              .in([category.id])
              .exec((err, count) => {
                if (err) { console.log(err); }
                category.postCount = count;

              });
          }, () => resolve(this.locals.data.categories));
        });
    });
  }
  currentCategoryFilter() {
    return new Promise((resolve, reject) => {
      if (this.params.category) {
        keystone.list('PostCategory')
          .model
          .findOne({ key: this.locals.filters.category })
          .exec((err, result) => {
            if (err) { console.log(err); }

            this.locals.data.category = result;
            resolve(this.locals.data.category);
          });
      } else {
        resolve();
      }
    });
  }
  loadPosts() {
    return new Promise((resolve, reject) => {
      const dbQuery = keystone.list('Post')
        .paginate({
          page: this.query.page || 1,
          perPage: 10,
          maxPages: 10
        })
        .where('state', 'published')
        .sort('-publishedDate')
        .populate('author categories');

      if (this.locals.data.category) {
        dbQuery
          .where('categories')
          .in([this.locals.data.category]);
      }

      dbQuery
        .exec((err, results) => {
          this.locals.data.posts = results;

          resolve(this.locals.data.posts);
        });
    });
  }
}