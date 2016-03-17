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
        const { validationErrors, enquirySubmitted } = data.enquiry;

        if (enquirySubmitted) {
          dispatch(actions.enquiryReceived({ enquirySubmitted }));
        } else {
          dispatch(actions.validationErrors({
            enquirySubmitted,
            hasErrors: true,
            validationErrors: getFormErrors(validationErrors)
          }));
        }

      })
      .catch(err => dispatch(actions.enquiryError(err)));
  }
};

function getFormErrors(validationErrors) {
  const { name, email, message } = validationErrors;

  let messages = {};

  if (name) { messages.name = name.message; }
  if (email) { messages.email = email.message; }
  if (message) { messages.message = message.message; }

  return messages;
}

function parseFormData(formData) {
  const { name, email, phone, message } = formData;
  const i = name === undefined ? -1 : name.indexOf(' ');
  const fullname = i !== -1 ? {
    first: name.substring(0, i),
    last: name.substring(i, name.length)
  } : {
    first: name,
    last: ''
  };

  return {
    name: fullname,
    email: email,
    phone: phone,
    message: message
  };
}