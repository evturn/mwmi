import keystone from 'keystone'

const { Field: { Types }, List } = keystone

const Episode = new List('Episode', {
  autokey: {
    path: 'key',
    from: 'title',
    unique: true
  }
})

Episode.add({
  title: {
    type: String,
    note: 'Tom Jones Drops In and Drinks a Jar of Ketchup'
  },
  url: {
    type: Types.Url,
    note: `Always include 'http://' for external links. For instance, writing 'twitter.com' translates to 'http://mamawemadeit.com/twitter.com' while writing 'http://twitter.com' translates to 'http://twitter.com'`
  },
  episodeNumber: {
    type: Types.Number,
    label: 'Episode No.',
    note: `Numbers only. Writing something like 'fifty two' will throw an error. Stick to numerals, br0.`
  },
  guest: {
    type: String,
    note: `Tom Jones`
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

Episode.defaultSort = '-createdAt'
Episode.defaultColumns = 'episodeNumber, title, guest, url, createdAt'
Episode.register()