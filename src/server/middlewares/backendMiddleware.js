import keystone from 'keystone'

const getUser = (req, res, next) => {
  res.locals.user = req.user
  next()
}

const getEpisodes = (req, res, next) => {
  keystone.list('Episode')
    .model.find()
    .where('state', 'published')
    .sort('-publishedAt')
    .exec((err, episodes) => {
      res.locals.episodes = episodes
      res.json(res.locals)
    })
}

export {
  getUser,
  getEpisodes,
}
