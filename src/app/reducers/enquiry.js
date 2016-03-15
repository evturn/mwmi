export default function enquiry(state = {}, action) {
  switch (action.type) {
    case 'ENQUIRY_SUCCESS':
      return Object.assign({}, state, {
        message: action.message
      });
    case 'ENQUIRY_ERROR':
      return Object.assign({}, state, {
        message: action.message
      });
    default:
      return state;
  }
}