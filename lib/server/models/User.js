'use strict';

var _keystone = require('keystone');

var _keystone2 = _interopRequireDefault(_keystone);

var _modelTransform = require('model-transform');

var _modelTransform2 = _interopRequireDefault(_modelTransform);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Types = _keystone2.default.Field.Types;
var User = new _keystone2.default.List('User');

User.add({
  name: {
    type: Types.Name,
    required: true,
    index: true
  },
  username: {
    type: String,
    required: true,
    initial: true,
    unique: true
  },
  email: {
    type: Types.Email,
    initial: true,
    required: true,
    index: true
  },
  password: {
    type: Types.Password,
    initial: true,
    required: true
  }
}, 'Permissions', {
  isAdmin: {
    type: Boolean,
    label: 'Can access Keystone',
    index: true
  }
});

User.schema.post('init', function (user) {
  var i = user.name.full.indexOf(' ');
  if (i > 0) {
    user.name.first = user.name.substring(0, i);
    user.name.last = user.name.substring(i, user.name.length);
  } else {
    user.name.first = user.name;
    user.name.last = '';
  }
});

User.schema.virtual('canAccessKeystone').get(function () {
  return this.isAdmin;
});

_modelTransform2.default.toJSON(User);

User.defaultColumns = 'name, email, username, isAdmin';
User.register();