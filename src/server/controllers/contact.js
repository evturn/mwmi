'use strict';
const keystone = require('keystone');
const Enquiry = keystone.list('Enquiry');

exports.get = (req, res, next) => {
  res.locals.section = 'contact';
  res.locals.enquiryTypes = Enquiry.fields.enquiryType.ops;
  res.locals.formData = req.body || {};
  res.locals.validationErrors = {};
  res.locals.enquirySubmitted = false;
  next();
};

exports.post = (req, res, next) => {
  const newEnquiry = new Enquiry.model();
  const updater = newEnquiry.getUpdateHandler(req);

  res.locals.section = 'contact';
  res.locals.enquiryTypes = Enquiry.fields.enquiryType.ops;
  res.locals.formData = req.body || {};
  res.locals.validationErrors = {};
  res.locals.enquirySubmitted = false;

  updater.process(req.body, {
    flashErrors: true,
    fields: 'name, email, phone, enquiryType, message',
    errorMessage: 'There was a problem submitting your enquiry:'
  }, function(err) {
    if (err) {
      res.locals.validationErrors = err.errors;
    } else {
      res.locals.enquirySubmitted = true;
    }
    next();
  });
};