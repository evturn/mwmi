'use strict';

var _keystone = require('keystone');

var _keystone2 = _interopRequireDefault(_keystone);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Types = _keystone2.default.Field.Types;
var List = _keystone2.default.List;


var Episode = new List('Episode', {
  map: {
    name: 'title'
  },
  autokey: {
    path: 'slug',
    from: 'title',
    unique: true
  }
});

Episode.add({
  title: {
    type: String,
    required: true
  },
  url: {
    type: Types.Url
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

Episode.defaultSort = '-createdAt';
Episode.defaultColumns = 'title, url, createdAt';
Episode.register();