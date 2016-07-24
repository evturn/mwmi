import keystone from 'keystone'

const getUser = (req, res, next) => {
  res.locals.user = req.user
  next()
}

const getEpisodes = (req, res, next) => {
  keystone.list('Episode')
    .model.find()
    .exec((err, episodes) => {
      res.locals.episodes = episodes
      res.json(res.locals)
    })
}

const getGalleryImages = (req, res, next) => {
  keystone.list('Gallery')
    .model.find()
    .sort('sortOrder')
    .populate('images')
    .exec((err, images) => {
      res.locals.gallery = images
      next()
    })
}

const getEnquiry = (req, res, next) => {
  res.locals.enquiry = {
    formData: req.body || {},
    validationErrors: {},
    enquirySubmitted: false
  }
  res.json(res.locals)
}

const processEnquiry = (req, res, next) => {
  const Enquiry = keystone.list('Enquiry')
  const newEnquiry = new Enquiry.model()
  const updater = newEnquiry.getUpdateHandler(req)

  res.locals.enquiry = {
    formData: req.body || {},
    validationErrors: {},
    enquirySubmitted: false
  }

  updater.process(req.body, {
    flashErrors: false,
    fields: 'name, email, phone, message',
    errorMessage: 'There was a problem submitting your enquiry:'
  }, err => {
    if (err) {
      res.locals.enquiry = {
        validationErrors: err.errors,
        hasErrors: true,
        enquirySubmitted: false
      }
    } else {
      res.locals.enquiry = {
        hasErrors: false,
        enquirySubmitted: true
      }
    }

    res.json(res.locals)
  })
}

export {
  getUser,
  getEpisodes,
  getGalleryImages,
  getEnquiry,
  processEnquiry,
}
