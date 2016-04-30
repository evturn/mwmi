import keystone from 'keystone'
import transform from 'model-transform'

const { Field: { Types }, List } = keystone

const User = new List('User')

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

User.schema.virtual('canAccessKeystone').get(function() {
  return this.isAdmin
})

transform.toJSON(User)

User.defaultColumns = 'name, email, username, isAdmin'
User.register()
