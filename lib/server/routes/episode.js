'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.send = exports.get = undefined;

var _keystone = require('keystone');

var _keystone2 = _interopRequireDefault(_keystone);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var get = exports.get = function get(req, res, next) {
  var q = _keystone2.default.list('Episode').model.find();

  q.exec(function (err, data) {
    res.locals.podcast = data;

    next();
  });
};

var send = exports.send = function send(req, res, next) {
  res.json(res.locals);
};