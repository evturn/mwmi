 export default function enquiry(state = {
  enquirySubmitted: false,
  validationErrors: {},
  formData: {}
}, action) {
  switch (action.type) {
    case 'ENQUIRY_RECEIVED':
      return Object.assign({}, state, {
        ...action.payload
      })
    case 'UPDATE_FORM_DATA':
      return Object.assign({}, state, {
        ...action.payload
      })
    case 'VALIDATION_ERRORS':
      return Object.assign({}, state, {
        ...action.payload
      })
    case 'VALIDATE_FIELD':
      return Object.assign({}, state, {
        ...action.payload
      })
    default:
      return state
  }
}

