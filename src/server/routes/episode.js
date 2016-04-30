import keystone from 'keystone'

export const get = (req, res, next) => {
  const q = keystone.list('Episode')
    .model.find()

  q.exec((err, data) => {
    res.locals.episode = data

    next()
  })
}

export const send = (req, res, next) => {
  res.json(res.locals)
}