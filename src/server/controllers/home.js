'use strict';
const keystone = require('keystone');
const async = require('async');

exports = module.exports = function(req, res, next) {
  res.locals.section = 'home';
  next();
};