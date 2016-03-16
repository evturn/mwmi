 export default function enquiry(state = {
  nameField: '' ,
  emailField: '',
  phoneField: '',
  messageField: '',
  enquiryType: 'message',
  enquirySubmitted: false,
  hasErrors: false,
  validationErrors: {}
}, action) {
  switch (action.type) {
    case 'ENQUIRY_RECEIVED':
      return Object.assign({}, state, {
        ...action.payload
      });
    case 'USER_IS_TYPING':
      return Object.assign({}, state, {
        ...action.value
      });
    case 'ENQUIRY_SUBMIT':
      return Object.assign({}, state, {
        ...action.payload
      });
    case 'ENQUIRY_ERROR':
      return Object.assign({}, state, {
        ...action.message
      });
    case 'VALIDATION_ERRORS':
      return Object.assign({}, state, {
        ...action.payload
      });
    default:
      return state;
  }
}

