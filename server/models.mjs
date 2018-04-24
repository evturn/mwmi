import keystone from 'keystone';

const { Field: { Types }, List } = keystone;

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
    type: Types.CloudinaryImage,
    label: 'Image',
  },
  url: {
    type: Types.Url,
    note: `Include 'http://' for external links. Leaving it off is interpretted as a link within your site.`,
    label: 'URL',
  },
  state: {
    type: Types.Select,
    label: 'State',
    options: 'draft, published, archived',
    default: 'draft',
    index: true
  },
  publishedAt: {
    type: Types.Date,
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

const User = new List('User');
User.add({
  email:    { type: Types.Email,    required: true, initial: true, index: true },
  name:     { type: Types.Name,     required: true, index: true },
  password: { type: Types.Password, required: true, initial: true, },
  username: { type: String,         required: true, initial: true, unique: true },
},
'Permissions', { 
  isAdmin:  { type: Boolean, label: 'Can access Keystone', index: true }
});

User.schema.virtual('canAccessKeystone').get(function() { return this.isAdmin });
User.defaultColumns = 'name, email, username, isAdmin';
User.register();

export {
  Episode,
  User
};
