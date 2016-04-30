import keystone from 'keystone';

const PostCategory = new keystone.List('PostCategory', {
  autokey: {
    from: 'name',
    path: 'key',
    unique: true
  },
  hidden: true
});

PostCategory.add({
  name: { type: String, required: true }
});

PostCategory.relationship({
  ref: 'Post',
  path: 'categories'
});

PostCategory.register();