import keystone from 'keystone'

const { Field: { Types }, List } = keystone

const Episode = new List('Episode', {
  map: {
    name: 'title'
  },
  autokey: {
    path: 'slug',
    from: 'title',
    unique: true
  }
})

Episode.add({
  title: {
    type: String,
    required: true
  },
  url: {
    type: Types.Url
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

Episode.defaultSort = '-createdAt'
Episode.defaultColumns = 'title, url, createdAt'
Episode.register()