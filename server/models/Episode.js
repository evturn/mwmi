import keystone from 'keystone'

const { Field, List } = keystone

const Episode = new List('Episode', {
  map: {
    name: 'title'
  },
  autokey: {
    path: 'key',
    from: 'title',
    unique: true,
  },
})

Episode.add({
  title: {
    type: String,
    label: 'Title',
    note: 'Tom Jones Swings By and Drinks a Jar of Ketchup',
  },
  image: {
    type: Field.Types.CloudinaryImage,
    label: 'Image',
  },
  url: {
    type: Field.Types.Url,
    note: `Include 'http://' for external links. Leaving it off is interpretted as a link within your site.`,
    label: 'URL',
  },
  state: {
    type: Field.Types.Select,
    label: 'State',
    options: 'draft, published, archived',
    default: 'draft',
    index: true
  },
  publishedAt: {
    type: Field.Types.Date,
    label: 'Publish Date',
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


Episode.defaultSort = '-publishedAt'
Episode.defaultColumns = 'title|30%, image, url, state|10%'
Episode.register()
