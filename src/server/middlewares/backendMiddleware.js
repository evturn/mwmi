import keystone from 'keystone'

const getLocals = (req, res, next) => {
  res.locals.user = req.user
  res.locals.nav = [
    {name: 'Home',    key: 'home',    href: '/'},
    {name: 'Gallery', key: 'gallery', href: '/gallery'},
    {name: 'About',   key: 'about',   href: '/about'}
  ]

  next()
}

const getEpisodes = (req, res, next) => {
  const q = keystone.list('Episode')
    .model.find()

  q.exec((err, data) => {
    res.locals.episodes = data

    next()
  })
}

const getGalleryImages = (req, res, next) => {
  const q = keystone.list('Gallery')
    .model.find()
    .sort('sortOrder')
    .populate('images')

  q.exec((err, data) => {
    res.locals.gallery = data

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
  }, function(err) {
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
  getLocals,
  getEpisodes,
  getGalleryImages,
  getEnquiry,
  processEnquiry,
}
