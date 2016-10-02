import keystone from 'keystone'

export default function initLocals() {
  return [
    getUser,
    getEpisodes
  ]
}

function getUser(req, res, next) {
  res.locals.user = req.user
  next()
}

function getEpisodes(req, res, next) {
  if (req.path !== '/mwmi') {
    return next('route')
  }

  keystone.list('Episode')
    .model.find()
    .where('state', 'published')
    .sort('-publishedAt')
    .exec((err, episodes) => {
      res.locals.episodes = episodes
      res.json(res.locals)
    })
}