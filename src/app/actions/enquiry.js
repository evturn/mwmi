import fetch from 'isomorphic-fetch'

const actions = {
  enquirySuccess(message) {
    return {
      type: 'ENQUIRY_SUCCESS',
      message
    };
  },
  enquiryError(message) {
    return {
      type: 'ENQUIRY_ERROR',
      message
    };
  }
};