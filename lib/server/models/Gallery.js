'use strict';

var _keystone = require('keystone');

var _keystone2 = _interopRequireDefault(_keystone);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Types = _keystone2.default.Field.Types;

var Gallery = new _keystone2.default.List('Gallery', {
  autokey: {
    from: 'name',
    path: 'key',
    unique: true
  }
});

Gallery.add({
  name: {
    type: String,
    required: true
  },
  publishedDate: {
    type: Date,
    default: Date.now
  },
  heroImage: {
    type: Types.CloudinaryImage
  },
  images: {
    type: Types.CloudinaryImages
  }
});

Gallery.register();