var keystone = require('keystone');

exports = module.exports = function(req, res, next) {
  const locals = res.locals;

  locals.section = 'blog';
  locals.filters = {
    post: req.params.post
  };
  locals.data = {
    posts: []
  };

  const postsQuery = keystone.list('Post').model.find().where('state', 'published').sort('-publishedDate').populate('author').limit('4');

  postsQuery.exec(function(err, results) {
    locals.data.posts = results;
    var postQuery = keystone.list('Post').model.findOne({
      state: 'published',
      slug: locals.filters.post
    }).populate('author categories');

    postQuery.exec(function(err, result) {
      locals.data.post = result;
      next(err);
    });
  });
};
