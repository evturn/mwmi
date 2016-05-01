 export default function enquiry(state = {
  section: 'contact',
  enquirySubmitted: false,
  hasErrors: false,
  error: null,
  validationErrors: {},
  formData: {}
}, action) {
  switch (action.type) {
    case 'ENQUIRY_RECEIVED':
      return Object.assign({}, state, {
        ...action.payload
      });
    case 'USER_IS_TYPING':
      return Object.assign({}, state, {
        formData: {
          ...state.formData,
          ...action.value
        }
      });
    case 'ENQUIRY_SUBMIT':
      return Object.assign({}, state, {
        ...action.payload
      });
    case 'ENQUIRY_ERROR':
      return Object.assign({}, state, {
        error: action.error
      });
    case 'VALIDATION_ERRORS':
      return Object.assign({}, state, {
        ...action.payload
      });
    default:
      return state
  }
}

