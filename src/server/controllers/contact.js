import keystone from 'keystone';

export const get = (req, res, next) => {
  res.locals.section = 'contact';
  res.locals.enquiryTypes = keystone.list('Enquiry').fields.enquiryType.ops;
  res.locals.formData = req.body || {};
  res.locals.validationErrors = {};
  res.locals.enquirySubmitted = false;
  next();
};

export const post = (req, res, next) => {
  const Enquiry = keystone.list('Enquiry');
  const newEnquiry = new Enquiry.model();
  const updater = newEnquiry.getUpdateHandler(req);

  res.locals.section = 'contact';
  res.locals.enquiryTypes = keystone.list('Enquiry').fields.enquiryType.ops;
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