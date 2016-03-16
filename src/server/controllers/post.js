import keystone from 'keystone';

let locals;

export const init = (req, res, next) => {

  locals = res.locals;

  locals.section = 'blog';
  locals.filters = {
    post: req.params.post
  };
  locals.data = {
    posts: []
  };


  const q = keystone.list('Post').model.findOne({
    state: 'published',
    slug: locals.filters.post
  }).populate('author categories');

  q.exec(function(err, result) {
    locals.data.post = result;
    res.json(locals);
  });
};


export const others = (req, res, next) => {
  const q = keystone.list('Post').model.find().where('state', 'published').sort('-publishedDate').populate('author').limit('4');

  q.exec(function(err, results) {
    locals.data.posts = results;
    res.json(locals);
  });
};