import keystone from 'keystone'

export const locals = (req, res, next) => {
  res.locals.user = req.user
  res.locals.nav = [
    {name: 'Home',    key: 'home',    href: '/'},
    {name: 'Gallery', key: 'gallery', href: '/gallery'},
    {name: 'About',   key: 'about',   href: '/about'}
  ]

  next()
}

export const episodes = (req, res, next) => {
  const q = keystone.list('Episode')
    .model.find()

  q.exec((err, data) => {
    res.locals.podcast = data

    next()
  })
}

export const gallery = (req, res, next) => {
  const q = keystone.list('Gallery')
    .model.find()
    .sort('sortOrder')
    .populate('images')

  q.exec((err, data) => {
    res.locals.gallery = data

    next()
  })
}

export const enquiries = {
  get: (req, res, next) => {
    res.locals.enquiry = {
      section: 'contact',
      formData: req.body || {},
      validationErrors: {},
      enquirySubmitted: false
    }

    res.json(res.locals)
  },
  post: (req, res, next) => {
    const Enquiry = keystone.list('Enquiry')
    const newEnquiry = new Enquiry.model()
    const updater = newEnquiry.getUpdateHandler(req)

    res.locals.enquiry = {
      section: 'contact',
      formData: req.body || {},
      validationErrors: {},
      enquirySubmitted: false
    }

    updater.process(req.body, {
      flashErrors: true,
      fields: 'name, email, phone, message',
      errorMessage: 'There was a problem submitting your enquiry:'
    }, function(err) {
      if (err) {
        res.locals.enquiry.validationErrors = err.errors
      } else {
        res.locals.enquiry.enquirySubmitted = true
      }

      res.json(res.locals)
    })
  }
}

export const complete = (req, res, next) => {
  res.json(res.locals)
}