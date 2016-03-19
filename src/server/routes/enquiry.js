import keystone from 'keystone';

export const get = (req, res, next) => {

  res.locals.enquiry = {
    section: 'contact',
    formData: req.body || {},
    validationErrors: {},
    enquirySubmitted: false
  };

  res.json(res.locals)
};

export const post = (req, res, next) => {
  const Enquiry = keystone.list('Enquiry');
  const newEnquiry = new Enquiry.model();
  const updater = newEnquiry.getUpdateHandler(req);

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
  }, function(err) {
    if (err) {
      res.locals.enquiry.validationErrors = err.errors;
    } else {
      res.locals.enquiry.enquirySubmitted = true;
    }

    res.json(res.locals)
  });
};