'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.post = exports.get = undefined;

var _keystone = require('keystone');

var _keystone2 = _interopRequireDefault(_keystone);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var get = exports.get = function get(req, res, next) {

  res.locals.enquiry = {
    section: 'contact',
    formData: req.body || {},
    validationErrors: {},
    enquirySubmitted: false
  };

  res.json(res.locals);
};

var post = exports.post = function post(req, res, next) {
  var Enquiry = _keystone2.default.list('Enquiry');
  var newEnquiry = new Enquiry.model();
  var updater = newEnquiry.getUpdateHandler(req);

  res.locals.enquiry = {
    section: 'contact',
    formData: req.body || {},
    validationErrors: {},
    enquirySubmitted: false
  };

  updater.process(req.body, {
    flashErrors: true,
    fields: 'name, email, phone, message',
    errorMessage: 'There was a problem submitting your enquiry:'
  }, function (err) {
    if (err) {
      res.locals.enquiry.validationErrors = err.errors;
    } else {
      res.locals.enquiry.enquirySubmitted = true;
    }

    res.json(res.locals);
  });
};