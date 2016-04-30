'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.get = undefined;

var _keystone = require('keystone');

var _keystone2 = _interopRequireDefault(_keystone);

var _cloudinary = require('cloudinary');

var _cloudinary2 = _interopRequireDefault(_cloudinary);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CLOUDINARY_HOST = 'http://res.cloudinary.com';

var get = exports.get = function get(req, res, next) {
  var q = _keystone2.default.list('Gallery').model.find().sort('sortOrder').populate('images');

  q.exec(function (err, data) {
    res.locals.gallery = data;

    next();
  });
};