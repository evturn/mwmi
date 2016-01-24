'use strict';
const BlogController = require('../controllers/blog-controller');

exports = module.exports = function(req, res) {
  const blog = new BlogController(req, res);
}