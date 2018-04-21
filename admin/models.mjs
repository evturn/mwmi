import keystone from 'keystone';

const { Field, List } = keystone;
const User = new List('User');

User.add({
  email:    { type: Field.Types.Email,    required: true, initial: true, index: true },
  name:     { type: Field.Types.Name,     required: true, index: true },
  password: { type: Field.Types.Password, required: true, initial: true, },
  username: { type: String,               required: true, initial: true, unique: true },
},
'Permissions', { 
  isAdmin:  { type: Boolean, label: 'Can access Keystone', index: true }
});

User.schema.virtual('canAccessKeystone').get(function() { return this.isAdmin });
User.defaultColumns = 'name, email, username, isAdmin';
User.register();

export {
  User
};
