'use strict';

var _keystone = require('keystone');

var _keystone2 = _interopRequireDefault(_keystone);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PostCategory = new _keystone2.default.List('PostCategory', {
  autokey: {
    from: 'name',
    path: 'key',
    unique: true
  }
});

PostCategory.add({
  name: { type: String, required: true }
});

PostCategory.relationship({
  ref: 'Post',
  path: 'categories'
});

PostCategory.register();