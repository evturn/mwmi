import { xhrpost } from 'actions/api';

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

export const isTyping = e => {

  return dispatch => {
    let inputValue;

    switch (e.name) {
      case 'name':
        inputValue = { name: e.value };
        break;
      case 'email':
        inputValue = { email: e.value };
        break;
      case 'phone':
        inputValue = { phone: e.value };
        break;
      case 'message':
        inputValue = { message: e.value };
        break;
    }

    dispatch(actions.userIsTyping(inputValue));
  };

};

export const enquiryReceived = payload => dispatch => dispatch(actions.enquiryReceived(payload));

export const enquirySubmit = formData => {

  const payload = parseFormData(formData);

  return dispatch => {

    xhrpost('/api/contact', payload)
      .then(res => res.json())
      .then(data => {
        const {name, email, message } = data.enquiry.validationErrors;

        if (name || email || message) {

          let messages = {};
          if (name) { messages.name = name.message; }
          if (email) { messages.email = email.message; }
          if (message) { messages.message = message.message; }

          dispatch(actions.validationErrors({
            hasErrors: true,
            enquirySubmitted: data.enquiry.enquirySubmitted,
            validationErrors: messages
          }));

        } else {
          dispatch(actions.enquiryReceived({ enquirySubmitted: data.enquiry.enquirySubmitted }));
        }
      })
      .catch(err => dispatch(actions.enquiryError(err)));
  }

};

function parseFormData(formData) {

  const { name, email, phone, message } = formData;

  const firstNameOnly = {
    first: name,
    last: ''
  };

  const [ first ] = name.split(' ');
  const i = name.indexOf(' ');
  const firstAndLastNames = {
    first,
    last: name.substring(i, name.length)
  };

  return {
    name: i !== -1 ? firstAndLastNames : firstNameOnly,
    email: email,
    phone: phone,
    message: message
  };

}