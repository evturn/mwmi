import keystone from 'keystone'

const { Field, List } = keystone

const Episode = new List('Episode', {
  map: {
    name: 'title'
  },
  autokey: {
    path: 'slug',
    from: 'title',
    unique: true,
  },
  defaultSort: '-publishedAt',
})

Episode.add({
  title: {
    type: String,
    note: 'Tom Jones Swings By and Drinks a Jar of Ketchup',
    initial: true,
  },
  image: {
    type: Field.Types.CloudinaryImage,
  },
  url: {
    type: Field.Types.Url,
    note: `Include 'http://' for external links. Leaving it off is interpretted as a link within your site.`,
  },
  state: {
    type: Field.Types.Select,
    options: 'draft, published, archived',
    default: 'draft',
    index: true
  },
  publishedDate: {
    type: Field.Types.Date,
    index: true,
    dependsOn: {
      state: 'published'
    }
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

Episode.defaultColumns = 'title|30%, image, url, state|10%'
Episode.register()
