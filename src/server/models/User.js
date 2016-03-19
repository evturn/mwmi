import keystone from 'keystone';
import transform from 'model-transform';

const Types = keystone.Field.Types;
const User = new keystone.List('User');

User.add({
  name: {
    type: Types.Name,
    required: true,
    index: true
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
});

User.schema.virtual('canAccessKeystone').get(function() {
  return this.isAdmin;
});

transform.toJSON(User);

User.defaultColumns = 'name, email, isAdmin';
User.register();
