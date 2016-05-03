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
    case 'USER_IS_TYPING':
      return Object.assign({}, state, {
        formData: {
          ...state.formData,
          ...action.value
        }
      })
    case 'VALIDATION_ERRORS':
      return Object.assign({}, state, {
        ...action.payload
      })
    default:
      return state
  }
}

