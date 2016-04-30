import keystone from 'keystone'
import transform from 'model-transform'

const Types = keystone.Field.Types
const User = new keystone.List('User')

User.add({
  name: {
    type: Types.Name,
    required: true,
    index: true
  },
  username: {
    type: String,
    required: true,
    initial: true,
    unique: true
  },
  email: {
    type: Types.Email,
    initial: true,
    required: true,
    index: true
  },
  password: {
    type: Types.Password,
    initial: true,
    required: true
  }
},
'Permissions', {
  isAdmin: {
    type: Boolean,
    label: 'Can access Keystone',
    index: true
  }
})

User.schema.post('init', user => {
    const i = user.name.full.indexOf(' ')
    if (i  > 0) {
      user.name.first = user.name.substring(0, i)
      user.name.last = user.name.substring(i, user.name.length)
    } else {
      user.name.first = user.name
      user.name.last = ''
    }
})

User.schema.virtual('canAccessKeystone').get(function() {
  return this.isAdmin
})

transform.toJSON(User)

User.defaultColumns = 'name, email, username, isAdmin'
User.register()
