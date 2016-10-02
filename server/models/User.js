
export default ({ Field, List }) => {
  const User = new List('User')

  User.add({
    name: {
      type: Field.Types.Name,
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
      type: Field.Types.Email,
      initial: true,
      required: true,
      index: true
    },
    password: {
      type: Field.Types.Password,
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
  User.defaultColumns = 'name, email, username, isAdmin'
  User.register()
}