'use strict';

var _keystone = require('keystone');

var _keystone2 = _interopRequireDefault(_keystone);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Types = _keystone2.default.Field.Types;


var Enquiry = new _keystone2.default.List('Enquiry', {
  nocreate: true,
  noedit: true
});

Enquiry.add({
  name: {
    type: Types.Name,
    required: true
  },
  email: {
    type: Types.Email,
    required: true
  },
  phone: {
    type: String
  },
  message: {
    type: Types.Markdown,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

Enquiry.defaultSort = '-createdAt';
Enquiry.defaultColumns = 'name, email, enquiryType, createdAt';
Enquiry.register();

// Enquiry.schema.pre('save', function(next) {
//   this.wasNew = this.isNew;
//   next();
// });

// Enquiry.schema.post('save', function() {
//   if (this.wasNew) {
//     this.sendNotificationEmail();
//   }
// });

// Enquiry.schema.methods.sendNotificationEmail = function(callback) {

//   if ('function' !== typeof callback) {
//     callback = function() {};
//   }

//   var enquiry = this;

//   keystone.list('User').model.find().where('isAdmin', true).exec(function(err, admins) {

//     if (err) return callback(err);

//     new keystone.Email('enquiry-notification').send({
//       to: admins,
//       from: {
//         name: 'mwmi',
//         email: 'contact@mwmi.com'
//       },
//       subject: 'New Enquiry for mwmi',
//       enquiry: enquiry
//     }, callback);

//   });

// };