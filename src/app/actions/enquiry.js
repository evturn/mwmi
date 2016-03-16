import fetch from 'isomorphic-fetch'

const actions = {
  enquiryReceived(payload) {
    return {
      type: 'ENQUIRY_RECEIVED',
      payload
    };
  },
  enquiryError(error) {
    return {
      type: 'ENQUIRY_ERROR',
      error
    };
  },
  userIsTyping(value) {
    return {
      type: 'USER_IS_TYPING',
      value
    };
  },
  enquirySubmit(payload) {
    return {
      type: 'ENQUIRY_SUBMIT',
      payload
    }
  },
  validationErrors(payload) {
    return {
      type: 'VALIDATION_ERRORS',
      payload
    };
  }
};

const xhrpost = (endpoint, data) => {
  return fetch(endpoint, {
    method: 'post',
    credentials: 'same-origin',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
}


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

export const enquirySubmit = payload => {
  return dispatch => {
    xhrpost('/api/contact', payload)
      .then(res => res.json())
      .then(data => {
        const {name, email, message } = data.validationErrors;

        if (name || email || message) {

          let messages = {};
          if (name) { messages.name = name.message; }
          if (email) { messages.email = email.message; }
          if (message) { messages.message = message.message; }

          dispatch(actions.validationErrors({
            hasErrors: true,
            enquirySubmitted:false,
            validationErrors: messages
          }));

        } else {
          dispatch(actions.enquiryReceived({ enquirySubmitted: true }));
        }
      })
      .catch(err => dispatch(actions.enquiryError(err)));
  }
};