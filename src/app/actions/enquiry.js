import fetch from 'isomorphic-fetch'

const actions = {
  enquiryReceived(payload) {
    return {
      type: 'ENQUIRY_RECEIVED',
      payload
    };
  },
  enquiryError(message) {
    return {
      type: 'ENQUIRY_ERROR',
      message
    };
  },
  userIsTyping(value) {
    return {
      type: 'USER_IS_TYPING',
      value
    };
  },
  enquirySubmit() {
    return {
      type: 'ENQUIRY_SUBMIT'
    }
  }

};


export const isTyping = e => {

  return dispatch => {
    let inputValue;

    switch (e.name) {
      case 'name':
        inputValue = { nameField: e.value };
        break;
      case 'email':
        inputValue = { emailField: e.value };
        break;
      case 'phone':
        inputValue = { phoneField: e.value };
        break;
      case 'message':
        inputValue = { messageField: e.value };
        break;
    }

    dispatch(actions.userIsTyping(inputValue));
  };

};

export const enquiryReceived = payload => {
  return dispatch => {
    dispatch(actions.enquiryReceived(payload));
  };
};