 export default function enquiry(state = {
  nameField: '' ,
  emailField: '',
  phoneField: '',
  messageField: '',
  enquiryType: 'message',
  enquirySubmitted: false,
  validationErrors: null
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
      return state;
    default:
      return state;
  }
}

