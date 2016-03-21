import { xhrpost } from 'actions/api';

const actions = {
  enquiryReceived:  payload => { type: 'ENQUIRY_RECEIVED', payload },
  enquiryError:     error   => { type: 'ENQUIRY_ERROR', error },
  enquirySubmit:    payload => { type: 'ENQUIRY_SUBMIT', payload },
  validationErrors: payload => { type: 'VALIDATION_ERRORS', payload },
  userIsTyping(value) {
    return {
      type: 'USER_IS_TYPING',
      value
    };
  }
};

export const isTyping = e => dispatch => dispatch(actions.userIsTyping({ [e.name]: e.value }));
export const enquiryReceived = payload => dispatch => dispatch(actions.enquiryReceived(payload));
export const enquirySubmit = formData => dispatch => {
  const payload = parseFormData(formData);

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